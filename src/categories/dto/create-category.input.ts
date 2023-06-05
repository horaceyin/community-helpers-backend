import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  // @Field(() => Int, { description: 'Category Id' })
  // id: number

  @Field(()=> String)
  name: string

  @Field(()=> Boolean, {nullable: true})
  is_userCreated?: boolean
}
