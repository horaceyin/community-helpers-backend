import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTakenHelpRequestInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
