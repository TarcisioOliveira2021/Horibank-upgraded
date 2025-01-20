import { Module } from "@nestjs/common";
import { PessoaController } from "./pessoa.controller";
import { PessoaService } from "./pessoa.service";
import { PrismaModule } from "../prisma/prisma.module";
import { ContaModule } from "src/conta/conta.module";
import { ExceptionsModule } from "src/http-exceptions/exceptions.module";

@Module({
    imports: [PrismaModule, ContaModule, ExceptionsModule],
    controllers: [PessoaController],
    providers: [PessoaService]
})
export class PessoaModule {}