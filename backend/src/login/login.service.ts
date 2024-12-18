import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioDTO } from './usuario_dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { PessoaService } from 'src/pessoa/pessoa.service';

@Injectable()
export class LoginService {
    constructor(
        private service: PrismaService,
        private jwtService: JwtService,
        private pessoaService: PessoaService
    ) {}

    async login(usuario: UsuarioDTO) {
        const userFounded = await this.validateUser(usuario);

        // if(userFounded != null){
        //     return userFounded.id;
        // }else{
        //     throw new UnauthorizedException();
        // }
    }

    
    private async validateUser(usuario: UsuarioDTO) {
        
        const user = await this.service.pessoa.findFirst({
            where: {
                usuario: usuario.login,
            }
        });

        
        

        
    }
}
