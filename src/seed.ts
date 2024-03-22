import { AuthorsOnBooks, PrismaClient, Tag } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { authorMocks, bookMocks } from './mock';

const prisma = new PrismaClient();

async function main() {
  const booksResult = await prisma.book.createMany({ data: bookMocks });
  const authorsResult = await prisma.author.createMany({ data: authorMocks });

  let authorsOnBooks = [];
  let tags = [];

  function generateTagsAndAuthorsBooks(index) {
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
    tag.bookId = index;
    tags.push(tag);

    const data = {} as AuthorsOnBooks;
    data.authorId = faker.number.int({ min: 1, max: 100 });
    data.bookId = index;
    authorsOnBooks.push(data);
  }

  for (let j = 1; j < 101; j++) {
    generateTagsAndAuthorsBooks(j);
  }

  await prisma.authorsOnBooks.createMany({
    data: authorsOnBooks,
  });
  await prisma.tag.createMany({
    data: tags,
  });

  authorsOnBooks = [];
  tags = [];

  for (let j = 1; j < 101; j++) {
    generateTagsAndAuthorsBooks(j);
  }

  await prisma.authorsOnBooks.createMany({
    data: authorsOnBooks,
  });
  await prisma.tag.createMany({
    data: tags,
  });

  console.log({ booksResult, authorsResult });
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
