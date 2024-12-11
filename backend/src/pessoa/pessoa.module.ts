import { Module } from "@nestjs/common";
import { PessoaController } from "./pessoa.controller";
import { PessoaService } from "./pessoa.service";
import { PrismaModule } from "../prisma/prisma.module";
import { ContaModule } from "src/conta/conta.module";

@Module({
    imports: [PrismaModule, ContaModule],
    controllers: [PessoaController],
    providers: [PessoaService]
})
export class PessoaModule {}