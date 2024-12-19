import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioDTO } from './usuario_dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { PessoaService } from 'src/pessoa/pessoa.service';
import { Pessoa } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
    constructor(
        private service: PrismaService,
        private jwtService: JwtService,
        private pessoaService: PessoaService
    ) {}

    async login(usuario: UsuarioDTO) {
        const userFounded = await this.validarUsuarioSenha(usuario);
        const token = await this.jwtService.signAsync({ id: userFounded.id });

        return {
            id: userFounded.id,
            token: token
        };
    }
 
    private async validarUsuarioSenha(usuario: UsuarioDTO) {
        const usuarioFounded = await this.pessoaService.verificarUsuarioExistente(usuario.login);

        if(await bcrypt.compare(usuario.password, usuarioFounded.senha)){
            return  usuarioFounded;
        }

        throw new UnauthorizedException();
    }
}
