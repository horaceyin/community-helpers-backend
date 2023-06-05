import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { UserHelpRequestActionUncheckedUpdateInput } from './../@generated/user-help-request-action/user-help-request-action-unchecked-update.input';
import { UserHelpRequestActionUncheckedCreateInput } from './../@generated/user-help-request-action/user-help-request-action-unchecked-create.input';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserHelpRequestActionService } from './user-help-request-action.service';
import { UserHelpRequestAction } from './entities/user-help-request-action.entity';
import { CreateUserHelpRequestActionInput } from './dto/create-user-help-request-action.input';
import { UpdateUserHelpRequestActionInput } from './dto/update-user-help-request-action.input';
import { UseGuards } from '@nestjs/common/decorators';

@Resolver(() => UserHelpRequestAction)
export class UserHelpRequestActionResolver {
  constructor(
    private readonly userHelpRequestActionService: UserHelpRequestActionService
  ) {}

  //@UseGuards(JwtAuthGuard) // TODO: wait until all fake data in created
  @Mutation(() => UserHelpRequestAction)
  async createUserHelpRequestAction(
    @Args('createUserHelpRequestActionInput') 
    createUserHelpRequestActionInput: UserHelpRequestActionUncheckedCreateInput
  ) {
    //console.log("start")
    const response = await this.userHelpRequestActionService.create(createUserHelpRequestActionInput);
    //console.log("Hello")
    console.log(response)
    //console.log("end")
    return response
  }

  @Query(() => [UserHelpRequestAction], { name: 'userHelpRequestAction' })
  findAll() {
    return this.userHelpRequestActionService.findAll();
  }

  @Query(() => UserHelpRequestAction, { name: 'userHelpRequestAction' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userHelpRequestActionService.findOne(id);
  }

  @Mutation(() => UserHelpRequestAction)
  updateUserHelpRequestAction(
    @Args('userActionId')
    userActionId: number,
    @Args('updateUserHelpRequestActionInput') 
    updateUserHelpRequestActionInput: UserHelpRequestActionUncheckedUpdateInput
  ) {
    return this.userHelpRequestActionService.update(userActionId, updateUserHelpRequestActionInput);
  }

  @Mutation(() => UserHelpRequestAction)
  removeUserHelpRequestAction(
    @Args('id', { type: () => Int }) id: number
  ) {
    return this.userHelpRequestActionService.remove(id);
  }
}
