/*
  Warnings:

  - You are about to drop the column `nome` on the `Pessoa` table. All the data in the column will be lost.
  - Added the required column `nome_completo` to the `Pessoa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario` to the `Pessoa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pessoa" DROP COLUMN "nome",
ADD COLUMN     "nome_completo" TEXT NOT NULL,
ADD COLUMN     "usuario" TEXT NOT NULL;
