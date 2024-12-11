import { Body, Controller, Post, Get, Param} from '@nestjs/common';
import { ContaService } from './conta.service';
import { ContaDTO } from './conta_dto';


@Controller('conta')
export class ContaController {
    constructor(private contaService: ContaService) {}

    @Post('cadastrar')
    cadastrarConta(@Body() contaDTO: ContaDTO) {
        return this.contaService.cadastrarConta(contaDTO);
    }

    @Get('listar-contas/:idPessoa')
    listarContas(@Param("idPessoa") idPessoa: string) {
        return this.contaService.listarContas(Number(idPessoa));
    }
}
