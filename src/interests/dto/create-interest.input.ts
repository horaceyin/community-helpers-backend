import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateInterestInput {
  @Field(() => Int, { description: 'userId' })
  userId: number;

  @Field(() => Int, { description: 'categoryId' })
  categoryId: number;
}
