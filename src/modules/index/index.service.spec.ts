import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { IndexService } from './index.service';

describe('IndexService', () => {
  let service: IndexService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IndexService, ConfigService],
    }).compile();

    service = module.get<IndexService>(IndexService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
