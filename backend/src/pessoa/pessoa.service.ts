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
        await this.verificarUsuarioCadastrado(pessoa.usuario);
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

        return {
            statusCode: HttpStatus.CREATED,
            message: 'Usuário cadastrado com sucesso'
        };
    }

    private convertDataNascimento(pessoa: PessoaDTO) {
        const dataNascimento = new Date(pessoa.dataNascimento).toISOString();
        pessoa.dataNascimento = dataNascimento.toString();
    }

    async hashearSenha(senha: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(senha, salt);
    }

    async verificarUsuarioCadastrado(usuario: string) {
        const usuarioRetornado = await this.getPessoa(usuario);

        if (usuarioRetornado != null) {
            throw new BadRequestException('Usuário já cadastrado');
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
            throw new NotFoundException('Pessoa não encontrada');

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

    
}
