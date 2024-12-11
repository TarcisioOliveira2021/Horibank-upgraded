/*
  Warnings:

  - You are about to alter the column `numero` on the `Conta` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Conta" ALTER COLUMN "numero" SET DATA TYPE INTEGER;
