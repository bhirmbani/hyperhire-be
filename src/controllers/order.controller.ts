import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Order } from '@prisma/client';
import { OrderService } from 'src/services/order.service';

@Controller('/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/user/:userId')
  getOrderByUserId(@Param('userId') userId: string): Promise<Order[]> {
    return this.orderService.getOrderByUserId(userId);
  }

  @Post()
  createOrder(@Body() payload: { userId: string }): Promise<Order> {
    return this.orderService.createOrder(payload);
  }

  @Put('/cancel/:orderId')
  cancelOrder(
    @Param('orderId') orderId: string,
    @Body() payload: { userId: string },
  ): Promise<Order> {
    return this.orderService.cancelOrder(orderId, payload.userId);
  }

  @Put('/pay/:orderId')
  payOrder(
    @Param('orderId') orderId: string,
    @Body() payload: { userId: string },
  ): Promise<Order> {
    return this.orderService.payOrder(orderId, payload.userId);
  }
}
