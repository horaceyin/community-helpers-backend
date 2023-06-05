import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Category } from 'src/categories/entities/category.entity';
import { HelpRequest } from 'src/help-requests/entities/help-request.entity';

@ObjectType()
export class HelpRequestsCategory {
  @Field(() => Int, { description: 'Help Request Id' })
  helpRequestId: number;

  @Field(() => HelpRequest)
  helpRequest: HelpRequest

  @Field(() => Int, { description: 'Category ID' })
  categoryId: number;

  @Field(() => Category)
  category: Category
}
