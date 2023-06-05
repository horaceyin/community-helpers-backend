import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { CreateHelpRequestInput } from "./create-help-request.input";

@InputType()
export class UpdateHelpRequestInput extends PartialType(CreateHelpRequestInput) {
  @Field(() => Int)
  id: number;
}