import { Injectable, HttpStatus, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ContaDTO } from './conta_dto';
import Decimal from 'decimal.js';

//Código para resolver o problema de serialização do JSON para  BigInt
declare global {
    interface BigInt {
        toJSON(): number;
    }
}
BigInt.prototype.toJSON = function () { return Number(this); }

@Injectable()
export class ContaService {

    constructor(private readonly prismaService: PrismaService) { }

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

        let tipoContaExitente = await this.prismaService.conta.findFirst({
            where: {
                idPessoa: +idPessoa,
                tipoConta: tipoConta            }
        });

        if (tipoContaExitente) {
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


    public async depositar(id: string, valor: number) {
        if (valor <= 0) {
            throw new InternalServerErrorException("Valor inválido");
        }

        let conta = await this.prismaService.conta.findUnique({
            where: {
                id: +id
            }
        });

        if (!conta) {
            throw new NotFoundException("Conta não encontrada");
        }

        conta.saldo = new Decimal(conta.saldo).plus(valor);

        await this.prismaService.conta.update({
            where: {
                id: +id
            },
            data: {
                saldo: conta.saldo 
            }
        });

        return {
            saldoAtual: conta.saldo,
        };
    }

    public async sacar(id: string, valor: number) {
        if (valor <= 0) {
            throw new InternalServerErrorException("Valor inválido");
        }

        let conta = await this.prismaService.conta.findUnique({
            where: {
                id: +id
            }
        });

        if (!conta) {
            throw new NotFoundException("Conta não encontrada");
        }

        if (new Decimal(conta.saldo).lessThan(valor)) {
            throw new InternalServerErrorException("Saldo insuficiente para saque");
        }

        conta.saldo = new Decimal(conta.saldo).minus(valor);

        await this.prismaService.conta.update({
            where: {
                id: +id
            },
            data: {
                saldo: conta.saldo 
            }
        });

        return {
            statusCode: HttpStatus.OK,
            message: 'Saque realizado com sucesso'
        };

    }

    public formatarSaldo(saldo: Decimal): string {
        return new Decimal(saldo).toFixed(2);
    }

    public async encerrarConta(id: string) {
        let conta = await this.prismaService.conta.findUnique({
            where: {
                id: +id
            }
        });

        if (!conta) {
            throw new NotFoundException("Conta não encontrada");
        }

        await this.prismaService.conta.delete({
            where: {
                id: +id
            }
        });

        return {
            statusCode: HttpStatus.OK,
            message: 'Conta encerrada com sucesso'
        };
    }


    public async buscarContaDestino(contaDestino: string, agenciaDestino: string, idContaOrigem: string) {
        contaDestino = contaDestino.split("-")[0];

        if(contaDestino.length != 6 || agenciaDestino.length != 4){
            throw new InternalServerErrorException("Conta ou agência com quantidade de dígitos inválida");
        }

        let conta = await this.prismaService.conta.findFirst({
            where: {
                numero: +contaDestino,
                agencia: +agenciaDestino,
            },
            include:{
                pessoa: true
            }
        });

        if (!conta) {
            throw new NotFoundException("Conta não encontrada");
        }

        if(conta.id == +idContaOrigem){
            throw new InternalServerErrorException("Você não pode transferir para você mesmo");
        }

        return {
            idContaDestino: conta.id,
            nomeContaDestino: conta.pessoa.nome_completo,
            agenciaDestino: conta.agencia,
            numeroContaDestino: conta.numero,
            digitoContaDestino: conta.digito,
            tipoContaDestino: conta.tipoConta
        };
    }
}
