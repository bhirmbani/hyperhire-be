import { Module } from '@nestjs/common';
import { BookModule } from './book.module';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [BookModule, PrismaModule],
})
export class AppModule {}
