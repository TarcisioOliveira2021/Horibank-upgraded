import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PessoaDTO } from './pessoa_dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { ContaService } from 'src/conta/conta.service';


@Injectable()
export class PessoaService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly contaService: ContaService
    ) {
    }

    async cadastrarPessoa(pessoa: PessoaDTO) {
        this.convertDataNascimento(pessoa);
        await this.verificarUsuarioCadastrado(pessoa.usuario, pessoa.nuCPF);
        const senhaHas = await this.hashearSenha(pessoa.senha);

        await this.prismaService.pessoa.create(
            {
                data: {
                    nuCPF: pessoa.nuCPF,
                    dataNascimento: pessoa.dataNascimento,
                    nome_completo: pessoa.nome_completo,
                    usuario: pessoa.usuario,
                    senha: senhaHas,
                    email: pessoa.email,
                    numero_celular: pessoa.numero_celular
                }
            });
    }

    private convertDataNascimento(pessoa: PessoaDTO) {
        pessoa.dataNascimento = this.validarDataNascimento(pessoa.dataNascimento);
    }

    private validarDataNascimento(dataNascimento: string): string {
        if(!Date.parse(dataNascimento))
            throw {
                status: HttpStatus.BAD_REQUEST,
                message: 'Falha ao converter a data de nascimento'
            } 

        let dataFormatada = new Date(dataNascimento);
        let dia = dataFormatada.getDay();
        let mes = dataFormatada.getMonth();
        let ano = dataFormatada.getFullYear();

        if(dia > 31 || mes > 12 || ano > new Date().getFullYear())
            throw {
                status: HttpStatus.BAD_REQUEST,
                message: 'O dia, mês ou ano da data de nascimento é inválido'
            }
        
        return dataFormatada.toISOString();
    }

    async hashearSenha(senha: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(senha, salt);
    }

    async verificarUsuarioCadastrado(usuario: string, nuCPF: string) {
        await this.verificarCPF(nuCPF);
        const usuarioRetornado = await this.getPessoa(usuario);

        if (usuarioRetornado != null) {
            throw {
                status: HttpStatus.FORBIDDEN,
                message: 'O nome de usuário já está em uso'
            }
        }
    }

    async getPessoaId(pessoaId: string) {
        const pessoa = await this.prismaService.pessoa.findUnique({
            where: {
                id: parseInt(pessoaId)
            },
            include: {
                contas: true
            }
        });
    
        if (!pessoa)
            throw{
                status: HttpStatus.BAD_REQUEST,
                message: 'Pessoa não encontrada'
            }

        const contas = pessoa.contas.map(conta => ({
            ...conta,
            saldo: this.contaService.formatarSaldo(conta.saldo)
        }));

        return {
            id: pessoa.id,
            nome_completo: pessoa.nome_completo,
            nuCPF: pessoa.nuCPF,
            dataNascimento: pessoa.dataNascimento,
            email: pessoa.email,
            numero_celular: pessoa.numero_celular,
            contas: contas
        }
    }

    async getPessoa(usuario: string) {
        return await this.prismaService.pessoa.findFirst({
            where: {
                usuario: usuario
            }
        });
    }

    private async verificarCPF(nuCPF: string) {
        const pessoa = await this.prismaService.pessoa.findFirst({
            where: {
                nuCPF: nuCPF
            }
        });

        if (pessoa != null) 
            throw{
                status: HttpStatus.FORBIDDEN,
                message: 'O CPF informado já está cadastrado'
            }
    }
    
}
