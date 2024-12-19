import { BadRequestException, Injectable } from '@nestjs/common';
import { PessoaDTO } from './pessoa_dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { parse } from 'path';

@Injectable()
export class PessoaService {
    constructor(
        private prismaService: PrismaService
    ) {
    }

    async cadastrarPessoa(pessoa: PessoaDTO){
        this.convertDataNascimento(pessoa);
        const user = await this.verificarUsuarioExistente(pessoa.usuario);

        if(user != null){
            throw new BadRequestException('Usuário já cadastrado');
        }

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

    public verificarUsuarioExistente(usuario: string){
        return this.prismaService.pessoa.findFirst({
            where: {
                usuario: usuario
            }
        });
    }

    public getPessoaId(pessoaId: string){
        return this.prismaService.pessoa.findUnique({
            where: {
                id: parseInt(pessoaId)
            }
        });
    }
}
