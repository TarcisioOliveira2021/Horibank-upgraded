import { Test, TestingModule } from '@nestjs/testing';
import { TransacaoController } from './transacao.controller';
import { TransacaoService } from './transacao.service';

describe('TransacaoController', () => {
  let controller: TransacaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransacaoController],
      providers: [TransacaoService],
    }).compile();

    controller = module.get<TransacaoController>(TransacaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
