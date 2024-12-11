import { Test, TestingModule } from '@nestjs/testing';
import { TransferenciaController } from './transferencia.controller';

describe('TransfereciaController', () => {
  let controller: TransferenciaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransferenciaController],
    }).compile();

    controller = module.get<TransferenciaController>(TransferenciaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
