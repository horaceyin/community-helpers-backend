import { User } from 'src/users/entities/user.entity';
import { HelpRequest } from 'src/help-requests/entities/help-request.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserHelpRequestAction {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  helpRequestId: number;

  @Field(() => String)
  actionType: string;

  @Field(type => HelpRequest)
  helpRequest: HelpRequest

  @Field(type => User)
  user: User

  @Field(() => Date)
  actionDateTime: Date;
}
