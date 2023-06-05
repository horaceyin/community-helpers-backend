import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Resolver, Query, Args, Mutation, Context, Int} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
// import { UserUpdateInput } from 'src/@generated/user/user-update.input';
import { UserUncheckedUpdateInput } from 'src/@generated/user/user-unchecked-update.input';
// import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // @Mutation(() => User)
  // createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
  //   return this.usersService.create(createUserInput);
  // }

  @Query(() => [User], { name: 'users'})
  //@UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user'})
  async findOne(@Args('username') username: string) {
    return this.usersService.findOne(username);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => User)
  me(@Context() context) {
    return this.usersService.findMe(context);
  }

  @Mutation(() => User)
  updateUser(
    @Args('userId', { type: () => Int }) 
    userId: number,

    @Args('updateUserInput') 
    updateUserInput: UpdateUserInput
    ) {
    return this.usersService.update(userId, updateUserInput);
  }

  // @Mutation(() => User)
  // removeUser(@Args('id', { type: () => Int }) id: number) {
  //   return this.usersService.remove(id);
  // }
}
