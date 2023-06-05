import { CreateRecommendedHelpRequestCacheInput } from './create-recommended-help-request-cache.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRecommendedHelpRequestCacheInput extends PartialType(CreateRecommendedHelpRequestCacheInput) {
  @Field(() => Int)
  id: number;
}
