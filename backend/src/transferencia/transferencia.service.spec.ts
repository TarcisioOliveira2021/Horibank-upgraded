import { Test, TestingModule } from '@nestjs/testing';
import { TransferenciaService } from './transferencia.service';

describe('TransferenciaService', () => {
  let service: TransferenciaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransferenciaService],
    }).compile();

    service = module.get<TransferenciaService>(TransferenciaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
