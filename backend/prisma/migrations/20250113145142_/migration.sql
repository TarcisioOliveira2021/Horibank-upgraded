-- CreateTable
CREATE TABLE "ChavePix" (
    "id" SERIAL NOT NULL,
    "idConta" INTEGER NOT NULL,
    "chave" TEXT NOT NULL,
    "tipoChave" TEXT NOT NULL,

    CONSTRAINT "ChavePix_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChavePix_idConta_key" ON "ChavePix"("idConta");

-- AddForeignKey
ALTER TABLE "ChavePix" ADD CONSTRAINT "ChavePix_idConta_fkey" FOREIGN KEY ("idConta") REFERENCES "Conta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
