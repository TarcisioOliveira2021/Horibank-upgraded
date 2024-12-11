-- CreateEnum
CREATE TYPE "TipoConta" AS ENUM ('CORRENTE', 'POUPANCA');

-- CreateTable
CREATE TABLE "Conta" (
    "id" SERIAL NOT NULL,
    "idPessoa" INTEGER NOT NULL,
    "numero" INTEGER NOT NULL,
    "digito" INTEGER NOT NULL,
    "saldo" DOUBLE PRECISION NOT NULL,
    "tipoConta" "TipoConta" NOT NULL,

    CONSTRAINT "Conta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pessoa" (
    "id" SERIAL NOT NULL,
    "nuCPF" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,

    CONSTRAINT "Pessoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transferencia" (
    "id" SERIAL NOT NULL,
    "idContaOrigem" INTEGER NOT NULL,
    "idContaDestino" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transferencia_pkey" PRIMARY KEY ("id")
);
