import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Interest {
  @Field(() => Int, { description: 'userId' })
  userId: number;

  @Field(() => Int, { description: 'categoryId' })
  categoryId: number;
}
