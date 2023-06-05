import { Test, TestingModule } from '@nestjs/testing';
import { RecommenderResolver } from './recommender.resolver';

describe('RecommenderResolver', () => {
  let resolver: RecommenderResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecommenderResolver],
    }).compile();

    resolver = module.get<RecommenderResolver>(RecommenderResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
