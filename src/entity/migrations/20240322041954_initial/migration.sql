/*
  Warnings:

  - The primary key for the `AuthorsOnBooks` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "AuthorsOnBooks" DROP CONSTRAINT "AuthorsOnBooks_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "AuthorsOnBooks_pkey" PRIMARY KEY ("id");
