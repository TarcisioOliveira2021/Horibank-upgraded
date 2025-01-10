import { Injectable, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ContaDTO } from './conta_dto';
import { Prisma } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

//Código para resolver o problema de serialização do JSON para  BigInt
declare global {
    interface BigInt {
        toJSON(): number;
    }
}
BigInt.prototype.toJSON = function () { return Number(this); }

@Injectable()
export class ContaService {
    constructor(private prismaService: PrismaService) { }

    async cadastrarConta(conta: ContaDTO) {
        await this.prismaService.conta.create({ data: await this.criarConta(conta) });

        return {
            statusCode: HttpStatus.CREATED,
            message: 'Conta cadastrada com sucesso'
        };
    }

    private async criarConta(conta: ContaDTO) {
        conta.tipoConta = await this.formatarTipoConta(conta.tipoConta);
        await this.verificarQuantidadeDeContas(+conta.idPessoa);
        await this.verificarTipoConta(conta.tipoConta, conta.idPessoa);
        
        let { numeroConta, digitoConta, agencia } = await this.gerarInformacoesContaRandomicas(conta);

        return {
            idPessoa: +conta.idPessoa,
            tipoConta: conta.tipoConta,
            numero: numeroConta,
            digito: digitoConta,
            agencia,
            saldo: 0,
        }
    }

    private async verificarQuantidadeDeContas(idPessoa: number) {
        let quantidadeDeContas = await this.prismaService.conta.count({
            where: {
                idPessoa: idPessoa
            }
        });

        if (quantidadeDeContas >= 2) {
            throw new InternalServerErrorException("Você já possui o máximo de contas cadastradas");
        }
    }

    private async verificarTipoConta(tipoConta: string, idPessoa: string) {
        
        if (tipoConta != "CORRENTE" && tipoConta != "POUPANCA")
            throw new InternalServerErrorException("Tipo de conta inválido");

        let tipoContaExitente = await this.prismaService.conta.findMany({
            where: {
                idPessoa: +idPessoa,
                tipoConta: tipoConta            }
        });

        if (tipoContaExitente.length > 0) {
            throw new InternalServerErrorException("Você já possui uma conta desse tipo cadastrada");
        }
    }

    private async formatarTipoConta(tipoConta: string): Promise<string> {
        const tipoContaFormatada = tipoConta.toUpperCase();
        return tipoContaFormatada === "POUPANÇA" ? tipoContaFormatada.replace("Ç", "C") : tipoContaFormatada;
    }

    private async gerarInformacoesContaRandomicas(conta: ContaDTO) {
        let numeroConta = Math.floor(100000 + Math.random() * 900000);
        let digitoConta = Math.floor(0 + Math.random() * 9);
        let agencia = Math.floor(1000 + Math.random() * 9000);

        if (await this.existeInformacosGeradas(numeroConta, digitoConta, agencia)) {
            return await this.gerarInformacoesContaRandomicas(conta);
        }

        return { numeroConta, digitoConta, agencia };
    }

    private async existeInformacosGeradas(numeroConta: number, digitoConta: number, agencia: number): Promise<boolean> {
        let contas = await this.prismaService.conta.findMany({
            where: {
                numero: numeroConta,
                digito: digitoConta,
                agencia: agencia
            }
        });

        if (contas.length > 0) {
            return true;
        }

        return false;
    }


    async listarContas(id: number) {
        let contas = await this.prismaService.conta.findMany({ where: { idPessoa: id } });

        if (contas.length == 0) {
            throw new NotFoundException("Você não possui contas cadastradas");
        }

        return contas;
    }
}
