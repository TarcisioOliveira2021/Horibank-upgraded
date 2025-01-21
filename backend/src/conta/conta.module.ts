import { Module, forwardRef } from "@nestjs/common";
import { ContaController } from "./conta.controller";
import { ContaService } from "./conta.service";
import { PrismaModule } from "../prisma/prisma.module";
import { TransferenciaModule } from "../transferencia/transferencia.module";
import { TransacaoModule } from "src/transacao/transacao.module";

@Module({
    imports: [PrismaModule, TransacaoModule, forwardRef(() => TransferenciaModule)],
    controllers: [ContaController],
    providers: [ContaService],
    exports: [ContaService]
})
export class ContaModule {}