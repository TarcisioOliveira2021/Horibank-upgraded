import { Controller, Post, Get, Param, Body, UseGuards} from '@nestjs/common';
import { ContaService } from './conta.service';
import { AuthGuard } from '../login/auth.guard';
import { ContaDTO } from './conta_dto';


@Controller('conta')
export class ContaController {
    constructor(private readonly contaService: ContaService) {}

    @UseGuards(AuthGuard)
    @Post('cadastrar')
    cadastrarConta(@Body() conta: ContaDTO) {
        return this.contaService.cadastrarConta(conta);
    }

    @UseGuards(AuthGuard)
    @Post('depositar/:id')
    depositar(@Param('id') id: string, @Body('valor') valor: number) {
        return this.contaService.depositar(id, valor);
    }


}
