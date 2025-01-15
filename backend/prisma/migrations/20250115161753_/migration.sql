-- DropForeignKey
ALTER TABLE "Conta" DROP CONSTRAINT "Conta_idPessoa_fkey";

-- DropForeignKey
ALTER TABLE "Transacao" DROP CONSTRAINT "Transacao_idConta_fkey";

-- DropForeignKey
ALTER TABLE "Transferencia" DROP CONSTRAINT "Transferencia_idContaDestino_fkey";

-- DropForeignKey
ALTER TABLE "Transferencia" DROP CONSTRAINT "Transferencia_idContaOrigem_fkey";

-- AddForeignKey
ALTER TABLE "Conta" ADD CONSTRAINT "Conta_idPessoa_fkey" FOREIGN KEY ("idPessoa") REFERENCES "Pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transferencia" ADD CONSTRAINT "Transferencia_idContaOrigem_fkey" FOREIGN KEY ("idContaOrigem") REFERENCES "Conta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transferencia" ADD CONSTRAINT "Transferencia_idContaDestino_fkey" FOREIGN KEY ("idContaDestino") REFERENCES "Conta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transacao" ADD CONSTRAINT "Transacao_idConta_fkey" FOREIGN KEY ("idConta") REFERENCES "Conta"("id") ON DELETE CASCADE ON UPDATE CASCADE;
