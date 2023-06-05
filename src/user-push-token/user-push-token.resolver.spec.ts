import { Test, TestingModule } from '@nestjs/testing';
import { UserPushTokenResolver } from './user-push-token.resolver';
import { UserPushTokenService } from './user-push-token.service';

describe('UserPushTokenResolver', () => {
  let resolver: UserPushTokenResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPushTokenResolver, UserPushTokenService],
    }).compile();

    resolver = module.get<UserPushTokenResolver>(UserPushTokenResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
