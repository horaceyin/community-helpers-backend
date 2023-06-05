import { InputType, Int, Field } from '@nestjs/graphql';
import { HelpRequest } from 'src/help-requests/entities/help-request.entity';
import { User } from 'src/users/entities/user.entity';

@InputType()
export class CreateRecommendedHelpRequestCacheInput {
  @Field()
  modelVersion: string;

  @Field(type => Int)
  recommendationOrder: number;

  @Field(type => Int)
  userId: number;

  @Field(type => Int)
  helpRequestId: number;
}
