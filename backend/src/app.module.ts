import { Module } from '@nestjs/common';
import { TransferenciaService } from './transferencia/transferencia.service';
import { TransferenciaController } from './transferencia/transferencia.controller';
import { ContaModule } from './conta/conta.module';
import { PessoaModule } from './pessoa/pessoa.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [ContaModule, PessoaModule, LoginModule],
  controllers: [TransferenciaController],
  providers: [TransferenciaService],
})
export class AppModule {}
 