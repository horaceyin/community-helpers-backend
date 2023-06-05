import { Test, TestingModule } from '@nestjs/testing';
import { HelpRequestsCategoriesResolver } from './help-requests-categories.resolver';
import { HelpRequestsCategoriesService } from './help-requests-categories.service';

describe('HelpRequestsCategoriesResolver', () => {
  let resolver: HelpRequestsCategoriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelpRequestsCategoriesResolver, HelpRequestsCategoriesService],
    }).compile();

    resolver = module.get<HelpRequestsCategoriesResolver>(HelpRequestsCategoriesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
