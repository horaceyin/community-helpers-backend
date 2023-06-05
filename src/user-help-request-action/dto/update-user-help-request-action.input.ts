import { CreateUserHelpRequestActionInput } from './create-user-help-request-action.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserHelpRequestActionInput extends PartialType(CreateUserHelpRequestActionInput) {
  @Field(() => Int)
  id: number;
}
