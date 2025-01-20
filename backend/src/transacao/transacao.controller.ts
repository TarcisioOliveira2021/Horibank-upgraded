import { Controller, Get, UseGuards, Param, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '../login/auth.guard';
import { TransacaoService } from './transacao.service';
import { ExceptionsService } from 'src/http-exceptions/exceptions.service';

@Controller('transacao')
export class TransacaoController {
  constructor(
    private readonly transacaoService: TransacaoService,
    private readonly exceptionService: ExceptionsService
  ) {}

  @UseGuards(AuthGuard)
  @Get('/listar/:idConta')
  async listarTransacoesPorConta(@Param('idConta') idConta: string){
    try{
      return {
        data: await this.transacaoService.listarTransacoesPorConta(parseInt(idConta))
      }
    }catch(e){
      return await this.exceptionService.handleHttpException(e);
    }
  }
}
