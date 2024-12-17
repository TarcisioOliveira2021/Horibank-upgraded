-- AddForeignKey
ALTER TABLE "Transferencia" ADD CONSTRAINT "Transferencia_idContaOrigem_fkey" FOREIGN KEY ("idContaOrigem") REFERENCES "Conta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transferencia" ADD CONSTRAINT "Transferencia_idContaDestino_fkey" FOREIGN KEY ("idContaDestino") REFERENCES "Conta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
