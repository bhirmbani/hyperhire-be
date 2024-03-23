import { Injectable } from '@nestjs/common';
import { Cart } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CartRepositories {
  constructor(private prisma: PrismaService) {}

  async getCartByUserId(params: { userId: number }): Promise<Cart[]> {
    const { userId } = params;
    return this.prisma.cart.findMany({
      where: {
        userId: userId,
      },
      include: {
        Book: true,
      },
    });
  }

  async addBookToCart(params: {
    payload: { bookId: number; userId: number };
  }): Promise<Cart> {
    const { payload } = params;
    return this.prisma.cart.create({
      data: {
        bookId: payload.bookId,
        userId: payload.userId,
      },
    });
  }

  async removeBookFromCart(params: { cartId: number }): Promise<Cart> {
    const { cartId } = params;
    return this.prisma.cart.delete({
      where: {
        id: cartId,
      },
    });
  }
}
