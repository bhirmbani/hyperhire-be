import { Injectable } from '@nestjs/common';
import { Book, TagName } from '@prisma/client';
import { BookRepository } from 'src/repositories/book.repositories';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  getBooks(query: { skip: string; take: string }): Promise<Book[]> {
    return this.bookRepository.books({
      skip: parseInt(query.skip),
      take: parseInt(query.take),
    });
  }

  getBooksByAuthor(authorId: string): Promise<Book[]> {
    return this.bookRepository.booksByAuthorId({
      authorId: parseInt(authorId),
    });
  }

  getBooksByTag({ name }: { name: string }): Promise<Book[]> {
    const splitted = name.split(',');
    const tags = splitted as TagName[];
    return this.bookRepository.booksByTagName({ tagName: tags });
  }

  getBooksByPoint({ min, max }: { min: string; max: string }): Promise<Book[]> {
    return this.bookRepository.booksByPoint({
      point: { min: parseInt(min), max: parseInt(max) },
    });
  }

  getBooksByTitle({ name }: { name: string }): Promise<Book[]> {
    return this.bookRepository.booksByTitle({ name });
  }
}
