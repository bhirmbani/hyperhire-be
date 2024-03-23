/*
  Warnings:

  - You are about to drop the column `cartId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_bookId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_cartId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "cartId";

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
