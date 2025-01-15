import { Controller, Post, Get, Param, Body, UseGuards, Delete, Patch, HttpStatus, HttpCode, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { ContaService } from './conta.service';
import { TransferenciaService } from '../transferencia/transferencia.service';
import { AuthGuard } from '../login/auth.guard';
import { ContaDTO_REQUEST } from './conta_dto_REQUEST';
import { stat } from 'fs';


@Controller('conta')
export class ContaController {
    constructor(
        private readonly contaService: ContaService,
        private readonly transferenciaService: TransferenciaService
    ) { }

    @UseGuards(AuthGuard)
    @Post('cadastrar')
    @HttpCode(HttpStatus.CREATED)
    async cadastrarConta(@Body() conta: ContaDTO_REQUEST) {
        try {
            await this.contaService.cadastrarConta(conta);
            return {message: 'Conta cadastrada com sucesso'};
        } catch (e) {
            if(e.message === 'Você já possui duas contas cadastradas')
                throw new ForbiddenException(e.message);

            if(e.message === 'Tipo de conta inválido')
                throw new ForbiddenException(e.message);

            if(e.message === 'Você já possui uma conta desse tipo cadastrada')
                throw new ForbiddenException(e.message);
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
            throw new BadRequestException(e.message);
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
            throw new BadRequestException(e.message);
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
            throw new BadRequestException(e.message);
        }
    }

    @UseGuards(AuthGuard)
    @Patch('transferir/:idContaOrigem')
    @HttpCode(HttpStatus.OK)
    async transferir(@Param('idContaOrigem') idContaOrigem: number, @Body('idContaDestino') idContaDestino: number, @Body('valor') valor: number) {
        try{
            await this.transferenciaService.transferir(idContaOrigem, idContaDestino, valor);
            return{message:'Transferência realizada com sucesso'};
            
        }catch(e){
            if(e.message === 'Revise os dados das contas fornecidos')
               throw new BadRequestException(e.message);
            
            if(e.message === 'Saldo insuficiente para transferência')
                throw new ForbiddenException(e.message);
        } 
    }

    @UseGuards(AuthGuard)
    @Get('/:agenciaDestino/:contaDestino/:idContaOrigem')
    @HttpCode(HttpStatus.OK)
    async buscarContaDestino(@Param('agenciaDestino') agenciaDestino: string, @Param('contaDestino') contaDestino: string, @Param('idContaOrigem') idContaOrigem: string) {
        try {
            let conta_RESPONSE = await this.contaService.buscarContaDestino(contaDestino, agenciaDestino, idContaOrigem);
            return {data: conta_RESPONSE};

        } catch (e) {
            if(e.message === 'Conta não encontrada')
                throw new NotFoundException(e.message);

            if(e.message === 'Não é possível transferir para a mesma conta')
                throw new ForbiddenException(e.message);

            if(e.message === 'Conta ou agência com quantidade de dígitos inválida')
                throw new ForbiddenException(e.message);
        }
    }
}
