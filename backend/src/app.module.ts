import { Module } from '@nestjs/common';
import { ContaModule } from './conta/conta.module';
import { PessoaModule } from './pessoa/pessoa.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [ContaModule, PessoaModule, LoginModule],
  controllers: [],
  providers: []
})
export class AppModule {}
 