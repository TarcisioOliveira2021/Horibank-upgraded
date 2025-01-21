import { Controller, Post, Get, Param, Body, UseGuards, Delete, Patch, HttpStatus, HttpCode, NotFoundException, ForbiddenException, BadRequestException, UseFilters } from '@nestjs/common';
import { ContaService } from './conta.service';
import { TransferenciaService } from '../transferencia/transferencia.service';
import { AuthGuard } from '../login/auth.guard';
import { ContaDTO_REQUEST } from './conta_dto_REQUEST';
import { HttpExceptionFilter } from 'src/http-exceptions/http-exception.filter';

@Controller('conta')
export class ContaController {
    constructor(
        private readonly contaService: ContaService,
        private readonly transferenciaService: TransferenciaService
    ) { }

    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuard)
    @UseFilters(new HttpExceptionFilter())
    @Post('cadastrar')
    async cadastrarConta(@Body() conta: ContaDTO_REQUEST) {
        await this.contaService.cadastrarConta(conta);
        return {
            message: 'Conta cadastrada com sucesso'
        };
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @UseFilters(new HttpExceptionFilter())
    @Patch('depositar/:id')
    async depositar(@Param('id') id: string, @Body('valor') valor: number) {
        return {
            mensagem: 'Depósito realizado com sucesso',
            saldoAtual: await this.contaService.depositar(id, valor)
        };
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @UseFilters(new HttpExceptionFilter())
    @Patch('sacar/:id')
    async sacar(@Param('id') id: string, @Body('valor') valor: number) {
        return {
            message: 'Saque realizado com sucesso',
            saldoAtual: await this.contaService.sacar(id, valor)
        };
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @UseFilters(new HttpExceptionFilter())
    @Delete('encerrar/:id')
    async encerrarConta(@Param('id') id: string) {
        await this.contaService.encerrarConta(id);
        return { 
            message: 'Conta encerrada com sucesso' 
        };
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @UseFilters(new HttpExceptionFilter())
    @Patch('transferir/:idContaOrigem')
    async transferir(@Param('idContaOrigem') idContaOrigem: number, @Body('idContaDestino') idContaDestino: number, @Body('valor') valor: number) {
        await this.transferenciaService.transferir(idContaOrigem, idContaDestino, valor);
        return { 
            message: 'Transferência realizada com sucesso' 
        };
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @UseFilters(new HttpExceptionFilter())
    @Get('/:agenciaDestino/:contaDestino/:idContaOrigem')
    async buscarContaDestino(@Param('agenciaDestino') agenciaDestino: string, @Param('contaDestino') contaDestino: string, @Param('idContaOrigem') idContaOrigem: string) {
        return {
            data: await this.contaService.buscarContaDestino(contaDestino, agenciaDestino, idContaOrigem)
        };
    }
}
