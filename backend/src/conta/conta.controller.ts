import { Controller, Post, Get, Param, Body, UseGuards} from '@nestjs/common';
import { ContaService } from './conta.service';
import { AuthGuard } from '../login/auth.guard';
import { ContaDTO } from './conta_dto';


@Controller('conta')
export class ContaController {
    constructor(private contaService: ContaService) {}

    @UseGuards(AuthGuard)
    @Post('cadastrar')
    cadastrarConta(@Body() conta: ContaDTO) {
        return this.contaService.cadastrarConta(conta);
    }

    @UseGuards(AuthGuard)
    @Get('listar-contas/:idPessoa')
    listarContas(@Param("idPessoa") idPessoa: string) {
        return this.contaService.listarContas(+idPessoa);
    }
}
