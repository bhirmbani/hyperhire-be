import { Controller, Get, Param, Query } from '@nestjs/common';
import { Book } from '@prisma/client';
import {
  GetBooksByPointDTO,
  GetBooksByTagNameDTO,
  GetBooksByTitleDTO,
  GetBooksDTO,
} from 'src/dto/books.dto';
import { BookService } from 'src/services/book.service';

@Controller('/books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getBooks(@Query() query: GetBooksDTO): Promise<Book[]> {
    return this.bookService.getBooks(query);
  }

  @Get('/author/:authorId')
  getBooksByAuthorId(@Param('authorId') authorId: string): Promise<Book[]> {
    return this.bookService.getBooksByAuthor(authorId);
  }

  @Get('/tag')
  getBooksByTagName(@Query() query: GetBooksByTagNameDTO): Promise<Book[]> {
    return this.bookService.getBooksByTag(query);
  }

  @Get('/point')
  getBooksByPoint(@Query() query: GetBooksByPointDTO): Promise<Book[]> {
    return this.bookService.getBooksByPoint(query);
  }

  @Get('/title')
  getBooksByTitle(@Query() query: GetBooksByTitleDTO): Promise<Book[]> {
    return this.bookService.getBooksByTitle(query);
  }
}
