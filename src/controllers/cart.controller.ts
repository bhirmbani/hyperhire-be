import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Cart } from '@prisma/client';
import { AddBookToCartDTO } from 'src/dto/cart.dto';
import { CartService } from 'src/services/cart.service';

@Controller('/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/user/:userId')
  getCartByUserId(@Param('userId') userId: string): Promise<Cart[]> {
    return this.cartService.getCartByUserId(userId);
  }

  @Post('/book')
  addBookToCart(@Body() payload: AddBookToCartDTO): Promise<Cart> {
    return this.cartService.addBookToCart(payload);
  }

  @Delete('/:cartId')
  removeBookFromCart(@Param('cartId') cartId: string): Promise<Cart> {
    return this.cartService.removeBookFromCart(cartId);
  }
}
