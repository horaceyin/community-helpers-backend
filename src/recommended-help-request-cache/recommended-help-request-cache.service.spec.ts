import { Test, TestingModule } from '@nestjs/testing';
import { RecommendedHelpRequestCacheService } from './recommended-help-request-cache.service';

describe('RecommendedHelpRequestCacheService', () => {
  let service: RecommendedHelpRequestCacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecommendedHelpRequestCacheService],
    }).compile();

    service = module.get<RecommendedHelpRequestCacheService>(RecommendedHelpRequestCacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
