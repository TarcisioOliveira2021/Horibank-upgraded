/*
  Warnings:

  - Added the required column `agencia` to the `Conta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Conta" ADD COLUMN     "agencia" INTEGER NOT NULL;
