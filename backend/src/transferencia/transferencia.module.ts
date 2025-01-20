import { Module, forwardRef } from "@nestjs/common";
import { TransferenciaController } from "./transferencia.controller";
import { TransferenciaService } from "./transferencia.service";
import { PrismaModule } from "../prisma/prisma.module";
import { ContaModule } from "../conta/conta.module";
import { TransacaoModule } from "../transacao/transacao.module";
import { ExceptionsModule } from "src/http-exceptions/exceptions.module";

@Module({
    imports: [PrismaModule,ExceptionsModule, TransacaoModule ,forwardRef(() => ContaModule)],
    controllers: [TransferenciaController],
    providers: [TransferenciaService],
    exports: [TransferenciaService]
})
export class TransferenciaModule {}