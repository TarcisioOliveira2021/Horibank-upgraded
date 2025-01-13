import { Injectable, InternalServerErrorException, NotFoundException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import Decimal from 'decimal.js';
import { ContaService } from '../conta/conta.service';
import { TransacaoService } from '../transacao/transacao.service';

@Injectable()
export class TransferenciaService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly contaService: ContaService,
        private readonly transacaoService: TransacaoService
    ) { }

    async transferir(idContaOrigem: number, idContaDestino: number, valor: number) {
        this.contaService.verificarSaldoNegativoZero(valor);

        let contaOrigem = await this.prismaService.conta.findUnique({
            where: {
                id: +idContaOrigem
            }
        });

        let contaDestino = await this.prismaService.conta.findUnique({
            where: {
                id: +idContaDestino
            }
        });

        this.validarTransferencia(contaOrigem, contaDestino, valor);
        contaOrigem.saldo = new Decimal(contaOrigem.saldo).minus(valor);
        contaDestino.saldo = new Decimal(contaDestino.saldo).plus(valor);

        await this.contaService.atualizarSaldoConta(+idContaOrigem, contaOrigem.saldo);
        await this.contaService.atualizarSaldoConta(+idContaDestino, contaDestino.saldo);
        await this.prismaService.transferencia.create({
            data: {
                valor: valor,
                contaOrigem: { connect: { id: +idContaOrigem } },
                contaDestino: { connect: { id: +idContaDestino } },
                data: new Date().toISOString()
            }
        });

        await this.transacaoService.criarTransacao({
            idConta: +idContaOrigem,
            valor: valor,
            data: new Date(),
            tipo: 'TRANSFERENCIA'
        });

        return {
            statusCode: HttpStatus.CREATED,
            message: 'Usuário cadastrado com sucesso'
        };
    }

    private validarTransferencia(contaOrigem: any, contaDestino: any, valor: number) {
        if (!contaOrigem || !contaDestino) {
            throw new NotFoundException('Revise os dados das contas fornecidos');
        }
        if (new Decimal(contaOrigem.saldo).toNumber() < valor) {
            throw new InternalServerErrorException('Saldo da conta insuficiente para fazer a transferência');
        }
    }
}
