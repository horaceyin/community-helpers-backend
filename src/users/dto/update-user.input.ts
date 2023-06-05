import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String, {nullable: true})
  username: string;

  @Field(() => String, {nullable: true})
  displayName: string

  @Field(() => String, {nullable: true})
  email: string
  
  @Field(() => String, {nullable: true})
  address:  string //TODO: Break it down

  @Field(() => String, {nullable: true})
  city: string

  @Field(() => String, {nullable: true})
  country: string

  @Field(() => String, {nullable: true})
  phone: string

  @Field(() => String, {nullable: true})
  avatar: string

  @Field(() => String, {nullable: true})
  district: string

  @Field(()=> Int, {nullable: true})
  userScore?: number;

  @Field(()=> Int, {nullable: true})
  helperCount?: number;
}
