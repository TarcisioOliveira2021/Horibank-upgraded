import { Module } from "@nestjs/common";
import { TransferenciaController } from "./transferencia.controller";
import { TransferenciaService } from "./transferencia.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [TransferenciaController],
    providers: [TransferenciaService],
    exports: [TransferenciaService]
})
export class TransferenciaModule {}