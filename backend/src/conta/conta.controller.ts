import { Controller, Post, Get, Param, Body, UseGuards, Delete, Patch} from '@nestjs/common';
import { ContaService } from './conta.service';
import { TransferenciaService } from '../transferencia/transferencia.service';
import { AuthGuard } from '../login/auth.guard';
import { ContaDTO } from './conta_dto';


@Controller('conta')
export class ContaController {
    constructor(
        private readonly contaService: ContaService,
        private readonly transferenciaService: TransferenciaService
    ) {}

    @UseGuards(AuthGuard)
    @Post('cadastrar')
    cadastrarConta(@Body() conta: ContaDTO) {
        return this.contaService.cadastrarConta(conta);
    }

    @UseGuards(AuthGuard)
    @Patch('depositar/:id')
    depositar(@Param('id') id: string, @Body('valor') valor: number) {
        return this.contaService.depositar(id, valor);
    }

    @UseGuards(AuthGuard)
    @Post('sacar/:id')
    sacar(@Param('id') id: string, @Body('valor') valor: number) {
        return this.contaService.sacar(id, valor);
    }

    @UseGuards(AuthGuard)
    @Delete('encerrar/:id')
    encerrarConta(@Param('id') id: string) {
        return this.contaService.encerrarConta(id);
    }

    @UseGuards(AuthGuard)
    @Post('transferir/:idContaOrigem')
    transferir(@Param('idContaOrigem') idContaOrigem: number, @Body('idContaDestino') idContaDestino: number, @Body('valor') valor: number) {
        return this.transferenciaService.transferir(idContaOrigem, idContaDestino, valor);
    }

    @UseGuards(AuthGuard)
    @Get('/:agenciaDestino/:contaDestino/:idContaOrigem')
    buscarContaDestino(@Param('agenciaDestino') agenciaDestino: string, @Param('contaDestino') contaDestino: string, @Param('idContaOrigem') idContaOrigem: string) {
        return this.contaService.buscarContaDestino(contaDestino, agenciaDestino, idContaOrigem);
    }

}
