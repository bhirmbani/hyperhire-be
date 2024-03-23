import { Injectable } from '@nestjs/common';
import { Cart } from '@prisma/client';
import { CartRepositories } from 'src/repositories/cart.repositories';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepositories) {}

  async getCartByUserId(userId: string): Promise<Cart[]> {
    return await this.cartRepository.getCartByUserId({
      userId: parseInt(userId),
    });
  }

  async addBookToCart(payload: {
    userId: string;
    bookId: string;
  }): Promise<Cart> {
    return await this.cartRepository.addBookToCart({
      payload: {
        userId: parseInt(payload.userId),
        bookId: parseInt(payload.bookId),
      },
    });
  }

  async removeBookFromCart(cartId: string): Promise<Cart> {
    return await this.cartRepository.removeBookFromCart({
      cartId: parseInt(cartId),
    });
  }
}
