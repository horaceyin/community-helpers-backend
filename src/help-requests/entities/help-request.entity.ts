import { Field, Int, ObjectType } from "@nestjs/graphql";
import { HelpRequestMatching } from "src/help-request-matchings/entities/help-request-matching.entity";
import { TakenHelpRequest } from "src/taken-help-requests/entities/taken-help-request.entity";
import { UserHelpRequestAction } from "src/user-help-request-action/entities/user-help-request-action.entity";
import { User } from "src/users/entities/user.entity";

@ObjectType()
export class HelpRequest {
  @Field(() => Int)
  id: number;

  @Field()
  category: string;

  @Field({nullable: true})
  creationDatetime?: Date;

  @Field()
  helpRequestDatetime: Date;

  @Field()
  title: string;

  @Field({nullable: true})
  is_taken?: boolean;

  @Field()
  description: string;

  @Field({nullable: true})
  address?: string;

  @Field({nullable: true})
  helperRating?: number;

  @Field({nullable: true})
  price?: number;

  @Field(() => [HelpRequestMatching], {nullable: true})
  helpRequestMatchings: HelpRequestMatching[];

  @Field(() => User)
  helpSeeker: User;

  @Field(() => Int)
  helpSeekerId: number;

  @Field(() => [String])
  images: string[]

  @Field(() => [UserHelpRequestAction], {nullable: true})
  userHelpRequestActions: UserHelpRequestAction[]

  @Field(() => [TakenHelpRequest])
  takenHelpRequests: TakenHelpRequest[]
}