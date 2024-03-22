import { Module } from '@nestjs/common';
import { BookModule } from './book.module';
import { PrismaModule } from '../prisma.module';
import { UserModule } from './user.module';

@Module({
  imports: [BookModule, UserModule, PrismaModule],
})
export class AppModule {}
