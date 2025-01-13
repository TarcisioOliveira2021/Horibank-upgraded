import { Injectable, InternalServerErrorException, NotFoundException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import Decimal from 'decimal.js';

@Injectable()
export class TransferenciaService {

    constructor(
        private readonly prismaService: PrismaService
    ) { }

    async transferir(idContaOrigem: number, idContaDestino: number, valor: number) {
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

        if (!contaOrigem || !contaDestino) {
            throw new NotFoundException('Revise os dados das contas fornecidos');
        }
        if (new Decimal(contaOrigem.saldo).toNumber() < valor) {
            throw new InternalServerErrorException('Saldo da conta insuficiente para fazer a transferência');
        }

        contaOrigem.saldo = new Decimal(contaOrigem.saldo).minus(valor);
        contaDestino.saldo = new Decimal(contaDestino.saldo).plus(valor);
        await this.prismaService.conta.update({ where: { id: +idContaOrigem }, data: { saldo: contaOrigem.saldo } });
        await this.prismaService.conta.update({ where: { id: +idContaDestino }, data: { saldo: contaDestino.saldo } });
        await this.prismaService.transferencia.create({
            data: {
                valor: valor,
                contaOrigem: { connect: { id: +idContaOrigem } },
                contaDestino: { connect: { id: +idContaDestino } },
                data: new Date().toISOString()
            }
        });

        return {
            statusCode: HttpStatus.CREATED,
            message: 'Usuário cadastrado com sucesso'
        };

    }
}
