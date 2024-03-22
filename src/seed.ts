import { AuthorsOnBooks, PrismaClient, Tag } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { authorMocks, bookMocks } from './mock';

const prisma = new PrismaClient();

async function main() {
  const booksResult = await prisma.book.createMany({ data: bookMocks });
  const authorsResult = await prisma.author.createMany({ data: authorMocks });
  const authorsOnBooks = [];
  const tags = [];
  for (let i = 1; i < 101; i++) {
    const tag = {} as Tag;
    const fiction = 'FICTION';
    const nonfiction = 'NONFICTION';
    const science = 'SCIENCE';
    const essay = 'ESSAY';
    const obj = {
      0: fiction,
      1: nonfiction,
      2: science,
      3: essay,
    };
    const random = Math.floor(Math.random() * 4);
    tag.name = obj[random];
    tag.bookId = i;
    tags.push(tag);

    const data = {} as AuthorsOnBooks;
    data.authorId = faker.number.int({ min: 1, max: 100 });
    data.bookId = i;
    authorsOnBooks.push(data);
  }
  const authorsOnBooksResult = await prisma.authorsOnBooks.createMany({
    data: authorsOnBooks,
  });
  const tagsResult = await prisma.tag.createMany({
    data: tags,
  });
  console.log({ tagsResult, booksResult, authorsResult, authorsOnBooksResult });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
