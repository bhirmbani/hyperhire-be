import { Injectable } from '@nestjs/common';
import { BooksOnOrders, Order, OrderStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { GetOrderByUserIdType } from 'src/type';

@Injectable()
export class OrderRepositories {
  constructor(private prisma: PrismaService) {}

  async getOrderByUserId(params: {
    userId: number;
  }): Promise<GetOrderByUserIdType[]> {
    const { userId } = params;
    return this.prisma.order.findMany({
      where: {
        userId: userId,
      },
      include: {
        Books: {
          select: {
            Book: {
              include: {
                Tag: true,
                Authors: {
                  include: {
                    Author: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async createOrder(params: {
    payload: { status: OrderStatus; userId: number };
  }): Promise<Order> {
    const { payload } = params;
    return this.prisma.order.create({
      data: {
        status: payload.status,
        userId: payload.userId,
      },
    });
  }

  async createBooksOnOrder(params: {
    payload: { orderId: number; bookId: number };
  }): Promise<BooksOnOrders> {
    const { payload } = params;
    return this.prisma.booksOnOrders.create({
      data: {
        orderId: payload.orderId,
        bookId: payload.bookId,
      },
    });
  }

  async updateStatus(params: { orderId: number; status }): Promise<Order> {
    const { orderId, status } = params;
    return this.prisma.order.update({
      data: {
        status,
      },
      where: {
        id: orderId,
      },
    });
  }
}
