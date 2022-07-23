import { Test, TestingModule } from '@nestjs/testing';
import { ProgressLogController } from './progress-log.controller';

describe('ProgressLogController', () => {
  let controller: ProgressLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgressLogController],
    }).compile();

    controller = module.get<ProgressLogController>(ProgressLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
