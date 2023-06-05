import { ObjectType, Field, Int } from '@nestjs/graphql';
import { HelpRequestsCategory } from 'src/help-requests-categories/entities/help-requests-category.entity';
import { Interest } from 'src/interests/entities/interest.entity';

@ObjectType()
export class Category {
  @Field(() => Int, { description: 'Category Id' })
  id: number;

  @Field(()=> String)
  name: string

  @Field(()=> Boolean)
  is_userCreated: boolean

  @Field(() => [Interest])
  interests: Interest[]

  @Field(() => [HelpRequestsCategory])
  helpRequestsCategories: HelpRequestsCategory[]
}
