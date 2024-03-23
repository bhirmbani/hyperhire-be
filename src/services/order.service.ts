import { BadRequestException, Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { CartRepositories } from 'src/repositories/cart.repositories';
import { OrderRepositories } from 'src/repositories/order.repositories';
import { UserRepository } from 'src/repositories/user.repositories';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepositories,
    private readonly cartRepository: CartRepositories,
    private readonly userRepository: UserRepository,
  ) {}

  async getOrderByUserId(userId: string): Promise<Order[]> {
    return await this.orderRepository.getOrderByUserId({
      userId: parseInt(userId),
    });
  }

  async createOrder(payload: { userId: string }): Promise<Order> {
    const booksOnCart = await this.cartRepository.getCartByUserId({
      userId: parseInt(payload.userId),
    });

    const order = await this.orderRepository.createOrder({
      payload: {
        userId: parseInt(payload.userId),
        status: 'UNPAID',
      },
    });

    for (let i = 0; i < booksOnCart.length; i++) {
      await this.orderRepository.createBooksOnOrder({
        payload: { orderId: order.id, bookId: booksOnCart[i].bookId },
      });
    }

    await this.cartRepository.clearUserCart({
      userId: parseInt(payload.userId),
    });

    return await order;
  }

  async cancelOrder(orderId: string, userId: string): Promise<Order> {
    const orders = await this.orderRepository.getOrderByUserId({
      userId: parseInt(userId),
    });

    const selectedOrder = orders.filter(
      (order) => order.id === parseInt(orderId),
    );

    if (selectedOrder[0].status === 'PAID') {
      throw new BadRequestException('order already paid');
    }

    return await this.orderRepository.updateStatus({
      orderId: parseInt(orderId),
      status: 'CANCEL',
    });
  }

  async payOrder(orderId: string, userId: string): Promise<Order> {
    const user = await this.userRepository.findByUserId({
      userId: parseInt(userId),
    });

    const orders = await this.orderRepository.getOrderByUserId({
      userId: parseInt(userId),
    });

    const selectedOrder = orders.filter(
      (order) => order.id === parseInt(orderId),
    );

    if (selectedOrder[0].status === 'PAID') {
      throw new BadRequestException('order already paid');
    }

    const booksToPay = selectedOrder[0].Books;

    let totalPoint = 0;
    const userPoint = user.point;

    for (let i = 0; i < booksToPay.length; i++) {
      totalPoint += booksToPay[i].Book.point;
    }

    if (userPoint - totalPoint < 0) {
      throw new BadRequestException('point not enough');
    } else {
      const pointAfterReduced = userPoint - totalPoint;
      await this.userRepository.updateUserPoint({
        userId: parseInt(userId),
        point: pointAfterReduced,
      });

      return await this.orderRepository.updateStatus({
        orderId: parseInt(orderId),
        status: 'PAID',
      });
    }
  }
}
