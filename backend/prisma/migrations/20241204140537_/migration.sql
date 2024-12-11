/*
  Warnings:

  - Added the required column `dataNascimento` to the `Pessoa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Pessoa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pessoa" ADD COLUMN     "dataNascimento" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL;
