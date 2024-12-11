/*
  Warnings:

  - Changed the type of `tipoConta` on the `Conta` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Conta" DROP COLUMN "tipoConta",
ADD COLUMN     "tipoConta" TEXT NOT NULL;

-- DropEnum
DROP TYPE "TipoConta";
