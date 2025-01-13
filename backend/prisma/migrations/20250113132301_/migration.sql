-- CreateTable
CREATE TABLE "Transacoes" (
    "id" SERIAL NOT NULL,
    "idConta" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "tipoTransacao" TEXT NOT NULL,

    CONSTRAINT "Transacoes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transacoes" ADD CONSTRAINT "Transacoes_idConta_fkey" FOREIGN KEY ("idConta") REFERENCES "Conta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
