import { Module } from '@nestjs/common';
import { BookModule } from './book.module';
import { PrismaModule } from '../prisma.module';
import { UserModule } from './user.module';
import { CartModule } from './cart.module';

@Module({
  imports: [BookModule, UserModule, CartModule, PrismaModule],
})
export class AppModule {}
