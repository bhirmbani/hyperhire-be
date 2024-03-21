import { Controller, Get } from '@nestjs/common';
import { Book } from '@prisma/client';
import { BookService } from 'src/services/book.service';

@Controller('/books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getHello(): Promise<Book[]> {
    return this.bookService.getBooks();
  }
}
