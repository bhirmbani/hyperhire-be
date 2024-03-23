import { Module } from '@nestjs/common';
import { BookModule } from './book.module';
import { PrismaModule } from '../prisma.module';
import { UserModule } from './user.module';
import { CartModule } from './cart.module';
import { OrderModule } from './order.module';

@Module({
  imports: [BookModule, UserModule, CartModule, OrderModule, PrismaModule],
})
export class AppModule {}
