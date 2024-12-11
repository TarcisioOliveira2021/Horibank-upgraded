/*
  Warnings:

  - You are about to drop the column `telefone` on the `Pessoa` table. All the data in the column will be lost.
  - Added the required column `numero_celular` to the `Pessoa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pessoa" DROP COLUMN "telefone",
ADD COLUMN     "numero_celular" TEXT NOT NULL;
