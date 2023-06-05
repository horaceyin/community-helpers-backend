import { UserActionMiddleware } from './user-action.middleware';

describe('UserActionMiddleware', () => {
  it('should be defined', () => {
    expect(new UserActionMiddleware()).toBeDefined();
  });
});
