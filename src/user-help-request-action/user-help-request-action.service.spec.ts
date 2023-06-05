import { Test, TestingModule } from '@nestjs/testing';
import { UserHelpRequestActionService } from './user-help-request-action.service';

describe('UserHelpRequestActionService', () => {
  let service: UserHelpRequestActionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserHelpRequestActionService],
    }).compile();

    service = module.get<UserHelpRequestActionService>(UserHelpRequestActionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
