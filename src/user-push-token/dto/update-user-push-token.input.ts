import { CreateUserPushTokenInput } from './create-user-push-token.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserPushTokenInput extends PartialType(CreateUserPushTokenInput) {
  @Field(() => Int)
  id: number;
}
