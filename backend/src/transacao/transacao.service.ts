import { Injectable, HttpStatus, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransacaoDTO } from './transacao_dto';


@Injectable()
export class TransacaoService {

  constructor(private readonly prismaService: PrismaService) { }

  public async criarTransacao(transacao: TransacaoDTO) {
    await this.prismaService.transacao.create(
      {
        data:
        {
          idConta: transacao.idConta,
          valor: transacao.valor,
          data: transacao.data,
          tipoTransacao: transacao.tipo
        }
      }
    );

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Transação cadastrada com sucesso'
    };
  }


  public async listarTransacoesPorConta(idConta: number) {
    let transacoes = await this.prismaService.transacao.findMany({
      where: {
        idConta: idConta
      }
    });

    if (transacoes.length == 0)
      throw new NotFoundException('Nenhuma transação encontrada para a conta informada');


    return transacoes;
  }
}
