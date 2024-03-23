/*
  Warnings:

  - You are about to drop the column `bookId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('UNPAID', 'PAID', 'CANCEL');

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_bookId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "bookId",
DROP COLUMN "userId",
ADD COLUMN     "status" "OrderStatus" NOT NULL;

-- CreateTable
CREATE TABLE "BooksOnOrders" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER,
    "bookId" INTEGER,

    CONSTRAINT "BooksOnOrders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BooksOnOrders" ADD CONSTRAINT "BooksOnOrders_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BooksOnOrders" ADD CONSTRAINT "BooksOnOrders_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;
