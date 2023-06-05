import { Test, TestingModule } from '@nestjs/testing';
import { RecommendedHelpRequestCacheResolver } from './recommended-help-request-cache.resolver';
import { RecommendedHelpRequestCacheService } from './recommended-help-request-cache.service';

describe('RecommendedHelpRequestCacheResolver', () => {
  let resolver: RecommendedHelpRequestCacheResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecommendedHelpRequestCacheResolver, RecommendedHelpRequestCacheService],
    }).compile();

    resolver = module.get<RecommendedHelpRequestCacheResolver>(RecommendedHelpRequestCacheResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
