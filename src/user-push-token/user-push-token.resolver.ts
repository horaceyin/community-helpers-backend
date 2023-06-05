import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserPushTokenService } from './user-push-token.service';
import { UserPushToken } from './entities/user-push-token.entity';
import { CreateUserPushTokenInput } from './dto/create-user-push-token.input';
import { UpdateUserPushTokenInput } from './dto/update-user-push-token.input';
import { UserPushTokenUncheckedUpdateInput } from 'src/@generated/user-push-token/user-push-token-unchecked-update.input';
import { UserPushTokenCreateInput } from 'src/@generated/user-push-token/user-push-token-create.input';
import { UserPushTokenUncheckedCreateInput } from 'src/@generated/user-push-token/user-push-token-unchecked-create.input';

@Resolver(() => UserPushToken)
export class UserPushTokenResolver {
  constructor(private readonly userPushTokenService: UserPushTokenService) {}

  @Mutation(() => UserPushToken)
  createUserPushToken(
  @Args('createUserPushTokenInput') 
  createUserPushTokenInput: UserPushTokenUncheckedCreateInput
  ) {
    return this.userPushTokenService.create(createUserPushTokenInput);
  }

  @Query(() => [UserPushToken], { name: 'userPushToken' })
  findAll() {
    return this.userPushTokenService.findAll();
  }

  @Query(() => UserPushToken, { name: 'userPushToken' })
  findOne(
    @Args('userId', { type: () => Int }) 
    userId: number,

    @Args('expoPushToken', { type: () => String }) 
    expoPushToken: string
  ) {
    return this.userPushTokenService.findOne(userId, expoPushToken);
  }

  @Mutation(() => UserPushToken)
  updateUserPushToken(
    @Args('updateUserPushTokenInput') 
    updateUserPushTokenInput: UserPushTokenUncheckedUpdateInput) {
    return this.userPushTokenService.update(updateUserPushTokenInput);
  }

  @Mutation(() => UserPushToken)
  removeUserPushToken(
    @Args('userId', { type: () => Int }) 
    userId: number,

    @Args('expoPushToken', { type: () => String }) 
    expoPushToken: string
    ) {
    return this.userPushTokenService.remove(userId, expoPushToken);
  }
}
