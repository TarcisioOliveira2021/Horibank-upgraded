import { Controller, Get, UseGuards, Param, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '../login/auth.guard';
import { TransacaoService } from './transacao.service';

@Controller('transacao')
export class TransacaoController {
  constructor(
    private readonly transacaoService: TransacaoService
  ) {}

  @UseGuards(AuthGuard)
  @Get('/listar/:idConta')
  async listarTransacoesPorConta(@Param('idConta') idConta: string){
      return {
        data: await this.transacaoService.listarTransacoesPorConta(parseInt(idConta))
      }
  }
}
