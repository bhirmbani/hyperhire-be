import { Injectable } from '@nestjs/common';
import { Book } from '@prisma/client';
import { BookRepository } from 'src/repositories/book';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  getBooks(): Promise<Book[]> {
    return this.bookRepository.books({});
  }
}
