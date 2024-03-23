import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { CartRepositories } from 'src/repositories/cart.repositories';
import { OrderRepositories } from 'src/repositories/order.repositories';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepositories,
    private readonly cartRepository: CartRepositories,
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

  async cancelOrder(orderId: string): Promise<Order> {
    return await this.orderRepository.updateStatus({
      orderId: parseInt(orderId),
      status: 'CANCEL',
    });
  }

  async payOrder(orderId: string): Promise<Order> {
    return await this.orderRepository.updateStatus({
      orderId: parseInt(orderId),
      status: 'PAID',
    });
  }
}
