import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { PessoaService } from 'src/pessoa/pessoa.service';
import { jwtConstants } from './constants';
import { PessoaModule } from 'src/pessoa/pessoa.module';
import { ContaModule } from 'src/conta/conta.module';
import { ExceptionsModule } from 'src/http-exceptions/exceptions.module';

@Module({
  imports: [PrismaModule, 
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2h' },
    }),
    PessoaModule,
    ContaModule,
    ExceptionsModule
  ],
  controllers: [LoginController],
  providers: [LoginService, PessoaService]
})
export class LoginModule {}
