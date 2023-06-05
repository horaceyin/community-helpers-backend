import { Test, TestingModule } from '@nestjs/testing';
import { UserHelpRequestActionResolver } from './user-help-request-action.resolver';
import { UserHelpRequestActionService } from './user-help-request-action.service';

describe('UserHelpRequestActionResolver', () => {
  let resolver: UserHelpRequestActionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserHelpRequestActionResolver, UserHelpRequestActionService],
    }).compile();

    resolver = module.get<UserHelpRequestActionResolver>(UserHelpRequestActionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
