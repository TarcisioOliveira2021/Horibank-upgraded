import { Injectable } from '@nestjs/common';
import { UsuarioDTO } from './usuario_dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LoginService {
    constructor(private service: PrismaService) {}

    login(usuario: UsuarioDTO) {
        return this.service.pessoa.findFirstOrThrow({
            where: {
                usuario: usuario.login
            }
        });
    }
}
