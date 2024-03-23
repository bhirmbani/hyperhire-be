import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma.module';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { OrderRepositories } from './repositories/order.repositories';
import { CartRepositories } from './repositories/cart.repositories';
import { UserRepository } from './repositories/user.repositories';

@Module({
  imports: [PrismaModule],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderRepositories,
    CartRepositories,
    UserRepository,
  ],
})
export class OrderModule {}
