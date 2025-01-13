import { Module } from '@nestjs/common';
import { ContaModule } from './conta/conta.module';
import { PessoaModule } from './pessoa/pessoa.module';
import { LoginModule } from './login/login.module';
import { TransferenciaModule } from './transferencia/transferencia.module';

@Module({
  imports: [ContaModule, PessoaModule, LoginModule, TransferenciaModule],
  controllers: [],
  providers: []
})
export class AppModule {}
 