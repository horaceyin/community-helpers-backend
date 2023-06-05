import { CreateTakenHelpRequestInput } from './create-taken-help-request.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTakenHelpRequestInput extends PartialType(CreateTakenHelpRequestInput) {
  @Field(() => Int)
  id: number;
}
