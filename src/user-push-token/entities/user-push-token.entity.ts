import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class UserPushToken {
  @Field(() => Int, { description: 'Push Token Id' })
  id: number;

  @Field(() => Int)
  userId: number

  @Field(() => User)
  user: User

  @Field(() => String)
  expoPushToken: string
}
