import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransacaoDTO } from './transacao_dto';
import { TransacaoSTRUCT } from './transacao_struct';


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
      },
      include:{
        conta: {
          include:{
            pessoa: true
          }
        }
      }
    });

    if (transacoes.length == 0)
      throw new NotFoundException('Nenhuma transação encontrada para a conta informada');


    const transacoesList: TransacaoSTRUCT[] = [];

    transacoes.forEach(transacao => {



      transacoesList.push({
        destinatario: transacao.conta.pessoa.nome_completo,
        valor: 'R$'+transacao.valor.toFixed(2),
        data: transacao.data.getDate().toString() + '/' + (transacao.data.getMonth() + 1).toString() + '/' + transacao.data.getFullYear().toString(),
        tipo: transacao.tipoTransacao,
      });
    });

    return transacoesList;
  }
}
