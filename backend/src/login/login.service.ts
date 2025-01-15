import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioDTO_REQUEST } from './usuario_dto_REQUEST';
import { UsuarioDTO_RESPONSE } from './usuario_dto_RESPONSE';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { PessoaService } from 'src/pessoa/pessoa.service';
import * as bcrypt from 'bcrypt';
import { Pessoa } from '@prisma/client';

@Injectable()
export class LoginService {
    constructor(
        private readonly service: PrismaService,
        private readonly jwtService: JwtService,
        private readonly pessoaService: PessoaService
    ) {}

    async login(usuario: UsuarioDTO_REQUEST): Promise<UsuarioDTO_RESPONSE> {
        const usuarioEncontrado = await this.pessoaService.getPessoa(usuario.login);
        const userFounded = await this.validarUsuarioSenha(usuario, usuarioEncontrado);
        const token = await this.jwtService.signAsync({ id: userFounded.id });

        return {
            id: userFounded.id,
            token: token
        }as UsuarioDTO_RESPONSE;
    }
 
    private async validarUsuarioSenha(usuario: UsuarioDTO_REQUEST, usuarioEncontrado: Pessoa) {
        if(usuario == null)
            throw new Error('Usuário não encontrado');
    
        if(await bcrypt.compare(usuario.password, usuarioEncontrado.senha))
            return  usuarioEncontrado;
        
        throw new Error('Senha ou login inválidos');
    }
}
