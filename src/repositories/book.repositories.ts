import { Injectable } from '@nestjs/common';
import { Book, Prisma, TagName } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BookRepository {
  constructor(private prisma: PrismaService) {}

  async books(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BookWhereUniqueInput;
    where?: Prisma.BookWhereInput;
    orderBy?: Prisma.BookOrderByWithRelationInput;
  }): Promise<Book[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.book.findMany({
      skip,
      take,
      cursor,
      where,
      include: {
        Tag: {
          select: {
            id: true,
            name: true,
          },
        },
        Authors: {
          select: {
            Author: true,
          },
        },
      },
      orderBy,
    });
  }

  async booksByAuthorId(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BookWhereUniqueInput;
    where?: Prisma.BookWhereInput;
    orderBy?: Prisma.BookOrderByWithRelationInput;
    authorId: number;
  }): Promise<Book[]> {
    const { skip, take, cursor, orderBy, authorId } = params;
    return this.prisma.book.findMany({
      skip,
      take,
      cursor,
      where: {
        Authors: {
          some: {
            authorId: authorId,
          },
        },
      },
      include: {
        Tag: {
          select: {
            id: true,
            name: true,
          },
        },
        Authors: {
          select: {
            Author: true,
          },
        },
      },
      orderBy,
    });
  }

  async booksByTagName(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BookWhereUniqueInput;
    where?: Prisma.BookWhereInput;
    orderBy?: Prisma.BookOrderByWithRelationInput;
    tagName: TagName[];
  }): Promise<Book[]> {
    const { skip, take, cursor, orderBy, tagName } = params;
    return this.prisma.book.findMany({
      skip,
      take,
      cursor,
      where: {
        Tag: {
          some: {
            name: {
              in: tagName,
            },
          },
        },
      },
      include: {
        Tag: {
          select: {
            id: true,
            name: true,
          },
        },
        Authors: {
          select: {
            Author: true,
          },
        },
      },
      orderBy,
    });
  }

  async booksByPoint(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BookWhereUniqueInput;
    where?: Prisma.BookWhereInput;
    orderBy?: Prisma.BookOrderByWithRelationInput;
    point: { min: number; max: number };
  }): Promise<Book[]> {
    const { skip, take, cursor, orderBy, point } = params;
    return this.prisma.book.findMany({
      skip,
      take,
      cursor,
      where: {
        point: {
          gte: point.min,
          lte: point.max,
        },
      },
      include: {
        Tag: {
          select: {
            id: true,
            name: true,
          },
        },
        Authors: {
          select: {
            Author: true,
          },
        },
      },
      orderBy,
    });
  }

  async booksByTitle(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BookWhereUniqueInput;
    where?: Prisma.BookWhereInput;
    orderBy?: Prisma.BookOrderByWithRelationInput;
    name: string;
  }): Promise<Book[]> {
    const { skip, take, cursor, orderBy, name } = params;
    return this.prisma.book.findMany({
      skip,
      take,
      cursor,
      where: {
        title: {
          contains: name,
          mode: 'insensitive',
        },
      },
      include: {
        Tag: {
          select: {
            id: true,
            name: true,
          },
        },
        Authors: {
          select: {
            Author: true,
          },
        },
      },
      orderBy,
    });
  }
}
