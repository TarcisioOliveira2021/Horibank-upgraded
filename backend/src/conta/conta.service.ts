import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TransacaoService } from '../transacao/transacao.service';
import type { ContaDTO } from './conta_dto';
import type { ContaDTO_REQUEST } from './conta_dto_REQUEST';
import type { ContaDTO_RESPONSE } from './conta_dto_response';
import { Conta } from '@prisma/client';
import Decimal from 'decimal.js';
import { NotFoundCorrespondentObjects } from 'src/http-exceptions/NotFoundCorrespondentObject';
import { NotAllowedAction } from 'src/http-exceptions/NotAllowedAction';

//Código para resolver o problema de serialização do JSON para  BigInt
declare global {
    interface BigInt {
        toJSON(): number;
    }
}
BigInt.prototype.toJSON = function () { return Number(this); }

@Injectable()
export class ContaService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly transacaoService: TransacaoService
    ) { }

    async cadastrarConta(conta: ContaDTO_REQUEST) {
        return await this.prismaService.conta.create({ data: await this.criarConta(conta) });
    }

    private async criarConta(conta: ContaDTO_REQUEST) {
        conta.tipoConta = await this.formatarTipoConta(conta.tipoConta);
        await this.verificarQuantidadeDeContas(+conta.idPessoa);
        await this.verificarTipoConta(conta.tipoConta, conta.idPessoa);
        
        let { numeroConta, digitoConta, agencia } = await this.gerarInformacoesContaRandomicas(conta);

        return {
            idPessoa: +conta.idPessoa,
            saldo: new Decimal(0),
            tipoConta: conta.tipoConta,
            numero: numeroConta,
            digito: digitoConta,
            agencia: agencia
        } as ContaDTO;
    }

    private async verificarQuantidadeDeContas(idPessoa: number) {
        let quantidadeDeContas = await this.prismaService.conta.count({
            where: {
                idPessoa: idPessoa
            }
        });

        if (quantidadeDeContas >= 2)
            throw new NotAllowedAction("Você já possui duas contas cadastradas, não é possível cadastrar mais");
    }

    private async verificarTipoConta(tipoConta: string, idPessoa: string) {  
        if (tipoConta != "CORRENTE" && tipoConta != "POUPANCA")
            throw new TypeError("Tipo de conta inválido");

        let tipoContaExitente = await this.prismaService.conta.findFirst({
            where: {
                idPessoa: +idPessoa,
                tipoConta: tipoConta            }
        });

        if (tipoContaExitente)
            throw new NotAllowedAction("Você já possui uma conta desse tipo cadastrada");
    }

    private async formatarTipoConta(tipoConta: string): Promise<string> {
        const tipoContaFormatada = tipoConta.toUpperCase();
        return tipoContaFormatada === "POUPANÇA" ? tipoContaFormatada.replace("Ç", "C") : tipoContaFormatada;
    }

    private async gerarInformacoesContaRandomicas(conta: ContaDTO_REQUEST) {
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
        let conta = await this.prismaService.conta.findUnique({
            where: {
                id: +id
            }
        });

        this.validarDeposito(valor,conta);
        conta.saldo = new Decimal(conta.saldo).plus(valor);
        await this.atualizarSaldoConta(+id, conta.saldo);
        await this.transacaoService.criarTransacao({
            idConta: +id,
            valor: valor,
            data: new Date(),
            tipo: "DEPOSITO"
        });

        return conta.saldo;
    }

    private validarDeposito(valor: number, conta: Conta) {
        this.verificarValorNegativoZero(valor);
        this.validarConta(conta);
    }

    public async sacar(id: string, valor: number) {
        let conta = await this.prismaService.conta.findUnique({
            where: {
                id: +id
            }
        });
        
        this.validarSaque(conta, valor);
        conta.saldo = new Decimal(conta.saldo).minus(valor);
        this.atualizarSaldoConta(+id, conta.saldo);
        await this.transacaoService.criarTransacao({
            idConta: +id,
            valor: valor,
            data: new Date(),
            tipo: "SAQUE"
        });

        return conta.saldo;
    }
    
    private validarSaque(conta: Conta, valor: number) {
        this.verificarValorNegativoZero(valor);
        this.validarConta(conta);   
        
        if (new Decimal(conta.saldo).lessThan(valor))
            throw new RangeError("Saldo insuficiente");
    }

    public async atualizarSaldoConta(id: number, saldo: Decimal) {
        await this.prismaService.conta.update({
            where: {
                id: id
            },
            data: {
                saldo: saldo 
            }
        });
    }

    public async encerrarConta(id: string) {
        let conta = await this.prismaService.conta.findUnique({
            where: {
                id: +id
            }
        });

        if (!conta)
            throw new NotFoundCorrespondentObjects("Conta não encontrada");
        

        await this.prismaService.conta.delete({
            where: {
                id: +id
            }
        });
    }
    
    public formatarSaldo(saldo: Decimal): string {
        return new Decimal(saldo).toFixed(2);
    }

    public async buscarContaDestino(contaDestino: string, agenciaDestino: string, idContaOrigem: string) {
        contaDestino = contaDestino.split("-")[0];

        let conta = await this.prismaService.conta.findFirst({
            where: {
                numero: +contaDestino,
                agencia: +agenciaDestino,
            },
            include:{
                pessoa: true
            }
        });


        this.validarBuscaContaDestino(conta, contaDestino, agenciaDestino, idContaOrigem);

        return {
            idContaDestino: conta.id,
            nomeContaDestino: conta.pessoa.nome_completo,
            agenciaDestino: conta.agencia,
            numeroContaDestino: conta.numero,
            digitoContaDestino: conta.digito,
            tipoContaDestino: conta.tipoConta
        } as ContaDTO_RESPONSE;
    }

    private validarBuscaContaDestino(conta: Conta, contaDestino: string, agenciaDestino: string, idContaOrigem: string) {
        this.validarConta(conta);

        if(contaDestino.length != 6 || agenciaDestino.length != 4)
            throw new NotAllowedAction("Número da conta ou agência inválidos");
        

        if(conta.id == +idContaOrigem)
            throw new NotAllowedAction("Não é possível transferir para a mesma conta");
        
    }

    public verificarValorNegativoZero(valor: number) {
        if (valor <= 0)
            throw new RangeError("Valor inválido");
    }

    private validarConta(conta: Conta) {
        if (!conta)
            throw new NotFoundCorrespondentObjects("Conta não encontrada");
    }

}
