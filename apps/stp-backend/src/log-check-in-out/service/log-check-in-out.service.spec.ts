import { Test, TestingModule } from '@nestjs/testing';
import { LogCheckInOutService } from './log-check-in-out.service';

describe('LogCheckInOutService', () => {
  let service: LogCheckInOutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogCheckInOutService],
    }).compile();

    service = module.get<LogCheckInOutService>(LogCheckInOutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
