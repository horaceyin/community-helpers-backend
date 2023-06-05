import { Test, TestingModule } from '@nestjs/testing';
import { InterestsResolver } from './interests.resolver';
import { InterestsService } from './interests.service';

describe('InterestsResolver', () => {
  let resolver: InterestsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InterestsResolver, InterestsService],
    }).compile();

    resolver = module.get<InterestsResolver>(InterestsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
