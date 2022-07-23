import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseRecordController } from './expense-record.controller';

describe('ExpenseRecordController', () => {
  let controller: ExpenseRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseRecordController],
    }).compile();

    controller = module.get<ExpenseRecordController>(ExpenseRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
