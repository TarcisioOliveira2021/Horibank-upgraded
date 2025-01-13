import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../login/auth.guard';
import { TransacaoDTO } from './transacao_dto';
import { TransacaoService } from './transacao.service';

@Controller('transacao')
export class TransacaoController {
  constructor(private readonly transacaoService: TransacaoService) {}

  @UseGuards(AuthGuard)
  @Get('/listar/:idConta')
  listarTransacoesPorConta(@Param('idConta') idConta: string){
    return this.transacaoService.listarTransacoesPorConta(parseInt(idConta));
  }
}
