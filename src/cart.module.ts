import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma.module';
import { CartController } from './controllers/cart.controller';
import { CartService } from './services/cart.service';
import { CartRepositories } from './repositories/cart.repositories';

@Module({
  imports: [PrismaModule],
  controllers: [CartController],
  providers: [CartService, CartRepositories],
})
export class CartModule {}
