import { ObjectType, Field, Int } from '@nestjs/graphql';
import { HelpRequest } from 'src/help-requests/entities/help-request.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class HelpRequestMatching {
  @Field(type => Int)
  id: number;

  @Field()
  character: string;

  @Field(type => Int)
  priority: number;

  @Field()
  state: string;

  @Field(type => User)
  user: User;

  @Field(type => Int)
  userId: number;

  @Field(type => HelpRequest)
  helpRequest: HelpRequest;

  @Field(type => Int)
  helpRequestId: number;
}
