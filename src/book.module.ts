import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma.module';
import { BookService } from './services/book.service';
import { BookController } from './controllers/book.controller';
import { BookRepository } from './repositories/book.repositories';

@Module({
  imports: [PrismaModule],
  controllers: [BookController],
  providers: [BookService, BookRepository],
})
export class BookModule {}
