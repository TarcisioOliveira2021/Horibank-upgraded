import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Transacao_REQUEST } from './transacao_dto_REQUEST';
import { Transacao_RESPONSE } from './transacao_dto_RESPONSE';
import { Transacao } from '@prisma/client';
import { NotFoundCorrespondentObjects } from 'src/http-exceptions/NotFoundCorrespondentObject';


@Injectable()
export class TransacaoService {

  constructor(private readonly prismaService: PrismaService) { }

  public async criarTransacao(transacao: Transacao_REQUEST) {
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
  }


  public async listarTransacoesPorConta(idConta: number) {
    const transacoesSTRUCT: Transacao_RESPONSE[] = [];
    let transacoes = await this.prismaService.transacao.findMany({
      where: {
        idConta: idConta
      },
      include:{
        conta: {
          include:{
            pessoa: true
          }
        }
      }
    });

    this.validarTransacoesEncontradas(transacoes);

    transacoes.forEach(transacao => {
      transacoesSTRUCT.push({
        destinatario: transacao.conta.pessoa.nome_completo,
        valor: 'R$'+transacao.valor.toFixed(2),
        data: transacao.data.getDate().toString() + '/' + (transacao.data.getMonth() + 1).toString() + '/' + transacao.data.getFullYear().toString(),
        tipo: transacao.tipoTransacao,
      });
    });

    return transacoesSTRUCT; 
  }

  private validarTransacoesEncontradas(transacoes: Transacao[]){
    if (transacoes.length == 0)
      throw new NotFoundCorrespondentObjects('Nenhuma transação encontrada para a conta informada')
  }
}
