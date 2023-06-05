import { Test, TestingModule } from '@nestjs/testing';
import { HelpRequestMatchingsResolver } from './help-request-matchings.resolver';
import { HelpRequestMatchingsService } from './help-request-matchings.service';

describe('HelpRequestMatchingsResolver', () => {
  let resolver: HelpRequestMatchingsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelpRequestMatchingsResolver, HelpRequestMatchingsService],
    }).compile();

    resolver = module.get<HelpRequestMatchingsResolver>(HelpRequestMatchingsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
