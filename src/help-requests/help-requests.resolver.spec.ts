import { Test, TestingModule } from '@nestjs/testing';
import { HelpRequestsResolver } from './help-requests.resolver';

describe('HelpRequestsResolver', () => {
  let resolver: HelpRequestsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelpRequestsResolver],
    }).compile();

    resolver = module.get<HelpRequestsResolver>(HelpRequestsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
