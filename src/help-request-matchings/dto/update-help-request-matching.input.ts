import { CreateHelpRequestMatchingInput } from './create-help-request-matching.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateHelpRequestMatchingInput extends PartialType(CreateHelpRequestMatchingInput) {
  @Field(() => Int)
  id: number;
}
