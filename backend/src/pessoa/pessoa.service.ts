import { BadRequestException, Injectable } from '@nestjs/common';
import { PessoaDTO } from './pessoa_dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PessoaService {
    constructor(
        private readonly prismaService: PrismaService
    ) {
    }

    async cadastrarPessoa(pessoa: PessoaDTO){
        this.convertDataNascimento(pessoa);
        await this.verificarUsuarioExistente(pessoa.usuario);
        const senhaHas = await this.hashearSenha(pessoa.senha);

        return this.prismaService.pessoa.create(
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

    private convertDataNascimento(pessoa: PessoaDTO){
        const dataNascimento = new Date(pessoa.dataNascimento).toISOString();
        pessoa.dataNascimento = dataNascimento.toString();
    }

    async hashearSenha(senha: string): Promise<string>{
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(senha, salt);
    }

    async verificarUsuarioExistente(usuario: string){
        const usuarioRetornado = await this.prismaService.pessoa.findFirstOrThrow({
            where: {
                usuario: usuario
            }
        });

        if(usuarioRetornado != null){
            return usuarioRetornado;
        }	

        throw new BadRequestException('Usuário não encontrado');
    }

    async getPessoaId(pessoaId: string){ 
        const pessoa = await this.prismaService.pessoa.findUnique({
            where: {
                id: parseInt(pessoaId)
            },
            include: {
                contas: true
            }
        });

        return {
            id: pessoa.id,
            nome_completo: pessoa.nome_completo,
            nuCPF: pessoa.nuCPF,
            dataNascimento: pessoa.dataNascimento,
            email: pessoa.email,
            numero_celular: pessoa.numero_celular,
            contas: pessoa.contas
        }
    }
}
