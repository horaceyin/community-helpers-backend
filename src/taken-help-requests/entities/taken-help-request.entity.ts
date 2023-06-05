import { ObjectType, Field, Int } from '@nestjs/graphql';
import { HelpRequest } from 'src/help-requests/entities/help-request.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class TakenHelpRequest {
  @Field(() => Int, { description: 'User Id' })
  userId: number;

  @Field(() => Int)
  helpRequestId: number

  @Field(() => User)
  user: User

  @Field(() => HelpRequest)
  helpRequest: HelpRequest

  
  @Field(type => Boolean)
  is_taken: boolean
  
  @Field(type => String)
  state:string
}
