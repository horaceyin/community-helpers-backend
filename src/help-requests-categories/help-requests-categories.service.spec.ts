import { Test, TestingModule } from '@nestjs/testing';
import { HelpRequestsCategoriesService } from './help-requests-categories.service';

describe('HelpRequestsCategoriesService', () => {
  let service: HelpRequestsCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelpRequestsCategoriesService],
    }).compile();

    service = module.get<HelpRequestsCategoriesService>(HelpRequestsCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
