import { Test, TestingModule } from '@nestjs/testing';
import { LogCheckInOutController } from './log-check-in-out.controller';

describe('LogCheckInOutController', () => {
  let controller: LogCheckInOutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogCheckInOutController],
    }).compile();

    controller = module.get<LogCheckInOutController>(LogCheckInOutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
