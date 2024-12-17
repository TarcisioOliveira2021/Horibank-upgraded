import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioDTO } from './usuario_dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LoginService {
    constructor(private service: PrismaService) {}

    //TODO https://medium.com/@osanmisola/jwt-authentication-for-your-nestjs-server-a-tutorial-276edf67d4ce
    async login(usuario: UsuarioDTO): Promise<number> {
        const userFounded = await this.service.pessoa.findFirst({
            where: {
                usuario: usuario.login,
                nuCPF: usuario.senha
            }
        });

        if(userFounded != null){
            return userFounded.id;
        }else{
            throw new UnauthorizedException();
        }
    }
}
