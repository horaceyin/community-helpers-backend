import { Field, InputType, Int } from "@nestjs/graphql";
import { HelpRequestMatching } from "src/help-request-matchings/entities/help-request-matching.entity";
import { User } from "src/users/entities/user.entity";

@InputType()
export class CreateHelpRequestInput {
  @Field()
  category: string;

  @Field({nullable: true})
  creationDatetime?: Date;

  @Field()
  helpRequestDatetime: Date;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field({nullable: true})
  is_taken?: boolean

  @Field({nullable: true})
  address?: string;

  @Field({nullable: true})
  helperRating?: number;

  @Field({nullable: true})
  price?: number;

  // @Field(() => Int)
  // helpSeekerId: number;
}