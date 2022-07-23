import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseRecordService } from './expense-record.service';

describe('ExpenseRecordService', () => {
  let service: ExpenseRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseRecordService],
    }).compile();

    service = module.get<ExpenseRecordService>(ExpenseRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
