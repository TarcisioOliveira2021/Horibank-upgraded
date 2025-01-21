import { Module } from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { TransacaoController } from './transacao.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TransacaoController],
  providers: [TransacaoService],
  exports: [TransacaoService]
})
export class TransacaoModule {}
