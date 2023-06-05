import { InputType, Int, Field } from '@nestjs/graphql';
import { HelpRequest } from 'src/help-requests/entities/help-request.entity';
import { User } from 'src/users/entities/user.entity';

@InputType()
export class CreateHelpRequestMatchingInput {
  @Field()
  character: string;

  @Field(type => Int)
  priority: number;

  @Field()
  state: string;

  @Field(type => Int)
  userId: number;

  @Field(type => Int)
  helpRequestId: number;
}
