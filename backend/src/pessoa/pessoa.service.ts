import { Injectable } from '@nestjs/common';
import { PessoaDTO } from './pessoa_dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class PessoaService {
    private iv: Buffer;
    public key: Buffer;

    constructor(
        private prismaService: PrismaService
    ) {
        this.initializeCrypto();
    }

    private async initializeCrypto() {
        this.iv = randomBytes(16);
        this.key = (await promisify(scrypt)('senha', 'salt', 32)) as Buffer;
    }

    async cadastrarPessoa(pessoa: PessoaDTO){
        this.convertDataNascimento(pessoa);
        pessoa.senha = await this.encriptarSenha(pessoa.senha);

        return this.prismaService.pessoa.create({data: pessoa});
    }

    private convertDataNascimento(pessoa: PessoaDTO){
        const dataNascimento = new Date(pessoa.dataNascimento).toISOString();
        pessoa.dataNascimento = dataNascimento.toString();
    }

    async encriptarSenha(senha: string): Promise<string>{
        const cipher = createCipheriv('aes-256-ctr', this.key, this.iv);
        return Buffer.concat([cipher.update(senha, 'utf-8'), cipher.final()]).toString('utf-8');
    }

    async desencriptarSenha(senha: Buffer<ArrayBuffer>): Promise<string>{
        const decipher = createDecipheriv('aes-256-ctr', this.key, this.iv);
        return Buffer.concat([decipher.update(senha), decipher.final()]).toString('utf-8');
    }
}
