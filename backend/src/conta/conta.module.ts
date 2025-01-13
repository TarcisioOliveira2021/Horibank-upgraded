import { Module } from "@nestjs/common";
import { ContaController } from "./conta.controller";
import { ContaService } from "./conta.service";
import { PrismaModule } from "../prisma/prisma.module";
import { TransferenciaModule } from "../transferencia/transferencia.module";

@Module({
    imports: [PrismaModule, TransferenciaModule],
    controllers: [ContaController],
    providers: [ContaService],
    exports: [ContaService]
})
export class ContaModule {}