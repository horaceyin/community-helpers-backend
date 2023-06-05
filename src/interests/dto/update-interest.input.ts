import { CreateInterestInput } from './create-interest.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateInterestInput extends PartialType(CreateInterestInput) {
  @Field(() => Int, { description: 'userId' })
  userId: number;

  @Field(() => Int, { description: 'categoryId' })
  categoryId: number;
}
