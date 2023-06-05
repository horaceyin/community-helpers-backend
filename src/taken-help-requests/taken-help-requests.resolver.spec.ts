import { Test, TestingModule } from '@nestjs/testing';
import { TakenHelpRequestsResolver } from './taken-help-requests.resolver';
import { TakenHelpRequestsService } from './taken-help-requests.service';

describe('TakenHelpRequestsResolver', () => {
  let resolver: TakenHelpRequestsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TakenHelpRequestsResolver, TakenHelpRequestsService],
    }).compile();

    resolver = module.get<TakenHelpRequestsResolver>(TakenHelpRequestsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
