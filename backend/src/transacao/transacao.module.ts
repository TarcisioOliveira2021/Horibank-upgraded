import { Module } from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { TransacaoController } from './transacao.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ExceptionsModule } from 'src/http-exceptions/exceptions.module';

@Module({
  imports: [PrismaModule, ExceptionsModule],
  controllers: [TransacaoController],
  providers: [TransacaoService],
  exports: [TransacaoService]
})
export class TransacaoModule {}
