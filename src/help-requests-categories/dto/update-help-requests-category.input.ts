import { CreateHelpRequestsCategoryInput } from './create-help-requests-category.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateHelpRequestsCategoryInput extends PartialType(CreateHelpRequestsCategoryInput) {
  @Field(() => Int)
  id: number;
}
