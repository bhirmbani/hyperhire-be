import { Controller, Get, Param, Query } from '@nestjs/common';
import { Book } from '@prisma/client';
import { BookService } from 'src/services/book.service';

@Controller('/books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getBooks(): Promise<Book[]> {
    return this.bookService.getBooks();
  }

  @Get('/author/:authorId')
  getBooksByAuthorId(@Param('authorId') authorId: string): Promise<Book[]> {
    return this.bookService.getBooksByAuthor(authorId);
  }

  @Get('/tag')
  getBooksByTagName(@Query() query: { name: string }): Promise<Book[]> {
    return this.bookService.getBooksByTag(query);
  }

  @Get('/point')
  getBooksByPoint(
    @Query() query: { min: string; max: string },
  ): Promise<Book[]> {
    return this.bookService.getBooksByPoint(query);
  }

  @Get('/title')
  getBooksByTitle(@Query() query: { name: string }): Promise<Book[]> {
    return this.bookService.getBooksByTitle(query);
  }
}
