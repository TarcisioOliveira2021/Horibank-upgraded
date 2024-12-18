import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { PessoaService } from 'src/pessoa/pessoa.service';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [LoginController],
  providers: [LoginService, PessoaService],
})
export class LoginModule {}
