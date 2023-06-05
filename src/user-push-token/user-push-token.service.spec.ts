import { Test, TestingModule } from '@nestjs/testing';
import { UserPushTokenService } from './user-push-token.service';

describe('UserPushTokenService', () => {
  let service: UserPushTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPushTokenService],
    }).compile();

    service = module.get<UserPushTokenService>(UserPushTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
