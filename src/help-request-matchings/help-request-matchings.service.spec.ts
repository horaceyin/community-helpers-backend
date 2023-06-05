import { Test, TestingModule } from '@nestjs/testing';
import { HelpRequestMatchingsService } from './help-request-matchings.service';

describe('HelpRequestMatchingsService', () => {
  let service: HelpRequestMatchingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelpRequestMatchingsService],
    }).compile();

    service = module.get<HelpRequestMatchingsService>(HelpRequestMatchingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
