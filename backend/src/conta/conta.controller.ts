import { Controller, Post, Get, Param, Body, UseGuards, Delete, Patch, HttpStatus, HttpCode, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { ContaService } from './conta.service';
import { ExceptionsService } from 'src/http-exceptions/exceptions.service';
import { TransferenciaService } from '../transferencia/transferencia.service';
import { AuthGuard } from '../login/auth.guard';
import { ContaDTO_REQUEST } from './conta_dto_REQUEST';
import { stat } from 'fs';


@Controller('conta')
export class ContaController {
    constructor(
        private readonly contaService: ContaService,
        private readonly transferenciaService: TransferenciaService,
        private readonly exceptionsService: ExceptionsService
    ) { }

    @UseGuards(AuthGuard)
    @Post('cadastrar')
    @HttpCode(HttpStatus.CREATED)
    async cadastrarConta(@Body() conta: ContaDTO_REQUEST) {
        try {
            await this.contaService.cadastrarConta(conta);
            return {message: 'Conta cadastrada com sucesso'};
        } catch (e) {
            throw await this.exceptionsService.handleHttpException(e);
        }
    }

    @UseGuards(AuthGuard)
    @Patch('depositar/:id')
    @HttpCode(HttpStatus.OK)
    async depositar(@Param('id') id: string, @Body('valor') valor: number) {
        try {
            let saldoAtual = await this.contaService.depositar(id, valor);
            return{
                mensagem: 'Depósito realizado com sucesso',
                saldoAtual: saldoAtual
            };
        } catch (e) {
            throw await this.exceptionsService.handleHttpException(e);
        }
    }

    @UseGuards(AuthGuard)
    @Patch('sacar/:id')
    @HttpCode(HttpStatus.OK)
    async sacar(@Param('id') id: string, @Body('valor') valor: number) {
        try {
            let saldoAtual = await this.contaService.sacar(id, valor);
            return {
                message: 'Saque realizado com sucesso',
                saldoAtual: saldoAtual
            };
        } catch (e) {
            throw await this.exceptionsService.handleHttpException(e);
        }
    }

    @UseGuards(AuthGuard)
    @Delete('encerrar/:id')
    @HttpCode(HttpStatus.OK)
    async encerrarConta(@Param('id') id: string) {
        try {
            await this.contaService.encerrarConta(id);
            return {message: 'Conta encerrada com sucesso'}

        } catch (e) {
            throw await this.exceptionsService.handleHttpException(e);
        }
    }

    @UseGuards(AuthGuard)
    @Patch('transferir/:idContaOrigem')
    @HttpCode(HttpStatus.OK)
    async transferir(@Param('idContaOrigem') idContaOrigem: number, @Body('idContaDestino') idContaDestino: number, @Body('valor') valor: number) {
        try{
            await this.transferenciaService.transferir(idContaOrigem, idContaDestino, valor);
            return{message:'Transferência realizada com sucesso'};
            
        }catch (e) {
            throw await this.exceptionsService.handleHttpException(e);
        }
    }

    @UseGuards(AuthGuard)
    @Get('/:agenciaDestino/:contaDestino/:idContaOrigem')
    @HttpCode(HttpStatus.OK)
    async buscarContaDestino(@Param('agenciaDestino') agenciaDestino: string, @Param('contaDestino') contaDestino: string, @Param('idContaOrigem') idContaOrigem: string) {
        try {
            return {
                data: await this.contaService.buscarContaDestino(contaDestino, agenciaDestino, idContaOrigem)
            };
        }catch (e) {
            throw await this.exceptionsService.handleHttpException(e);
        }
    }
}
