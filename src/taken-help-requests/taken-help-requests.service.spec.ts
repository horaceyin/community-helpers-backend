import { Test, TestingModule } from '@nestjs/testing';
import { TakenHelpRequestsService } from './taken-help-requests.service';

describe('TakenHelpRequestsService', () => {
  let service: TakenHelpRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TakenHelpRequestsService],
    }).compile();

    service = module.get<TakenHelpRequestsService>(TakenHelpRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
