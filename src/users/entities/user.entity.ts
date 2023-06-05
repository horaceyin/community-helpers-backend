import { ObjectType, Field, Int } from '@nestjs/graphql';
import { HelpRequestMatching } from 'src/help-request-matchings/entities/help-request-matching.entity';
import { HelpRequest } from 'src/help-requests/entities/help-request.entity';
import { Interest } from 'src/interests/entities/interest.entity';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  
  @Field({nullable: true})
  displayName: string

  @Field({nullable: true})
  email: string
  
  @Field({nullable: true})
  address:  string //TODO: Break it down

  @Field({nullable: true})
  city: string

  @Field({nullable: true})
  country: string

  @Field({nullable: true})
  phone: string

  @Field({nullable: true})
  avatar: string

  
  @Field({nullable: true})
  district: string

  @Field(()=> Int, {nullable: true})
  userScore?: number;

  @Field(()=> Int, {nullable: true})
  helperCount?: number;
  
    
  @Field(() => [Interest], {nullable: true})
  interests: Interest[]

  @Field(() => [HelpRequestMatching])
  helpRequestMatchings: HelpRequestMatching[];
  
  @Field(() => [HelpRequest])
  userCreatedHelpRequests: HelpRequest[];
}
