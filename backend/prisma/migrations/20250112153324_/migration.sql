/*
  Warnings:

  - You are about to alter the column `saldo` on the `Conta` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(9,2)`.

*/
-- AlterTable
ALTER TABLE "Conta" ALTER COLUMN "saldo" SET DATA TYPE DECIMAL(9,2);
