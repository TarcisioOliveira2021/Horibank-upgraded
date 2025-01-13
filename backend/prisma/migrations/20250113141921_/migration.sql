/*
  Warnings:

  - You are about to drop the `Transacoes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transacoes" DROP CONSTRAINT "Transacoes_idConta_fkey";

-- DropTable
DROP TABLE "Transacoes";

-- CreateTable
CREATE TABLE "Transacao" (
    "id" SERIAL NOT NULL,
    "idConta" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "tipoTransacao" TEXT NOT NULL,

    CONSTRAINT "Transacao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transacao" ADD CONSTRAINT "Transacao_idConta_fkey" FOREIGN KEY ("idConta") REFERENCES "Conta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
