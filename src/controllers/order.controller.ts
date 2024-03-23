import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Order } from '@prisma/client';
import { CancelOrderDTO, CreateOrderDTO, PayOrderDTO } from 'src/dto/order.dto';
import { OrderService } from 'src/services/order.service';

@Controller('/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/user/:userId')
  getOrderByUserId(@Param('userId') userId: string): Promise<Order[]> {
    return this.orderService.getOrderByUserId(userId);
  }

  @Post()
  createOrder(@Body() payload: CreateOrderDTO): Promise<Order> {
    return this.orderService.createOrder(payload);
  }

  @Put('/cancel/:orderId')
  cancelOrder(
    @Param('orderId') orderId: string,
    @Body() payload: CancelOrderDTO,
  ): Promise<Order> {
    return this.orderService.cancelOrder(orderId, payload.userId);
  }

  @Put('/pay/:orderId')
  payOrder(
    @Param('orderId') orderId: string,
    @Body() payload: PayOrderDTO,
  ): Promise<Order> {
    return this.orderService.payOrder(orderId, payload.userId);
  }
}
