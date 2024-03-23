import { Author, AuthorsOnBooks, Book, Order, Tag } from '@prisma/client';

export interface BookType extends Book {
  Tag: Tag[];
  Authors: AuthorType[];
}
export interface GetOrderByUserIdType extends Order {
  Books: {
    Book: BookType;
  }[];
}

export interface AuthorType extends AuthorsOnBooks {
  Author: Author;
}
