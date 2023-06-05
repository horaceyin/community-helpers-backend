import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
// import { CategoryUpdateInput } from 'src/@generated/category/category-update.input';
// import { CategoryCreateInput } from 'src/@generated/category/category-create.input';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { CategoryUncheckedCreateInput } from 'src/@generated/category/category-unchecked-create.input';
import { CategoryUncheckedUpdateInput } from 'src/@generated/category/category-unchecked-update.input';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Mutation(() => Category)
  createCategory(
    @Args('createCategoryInput') 
    createCategoryInput: CreateCategoryInput,
  ) {
    return this.categoriesService.create(createCategoryInput);
  }

  @Query(() => [Category], { name: 'categories' })
  findAll(
    @Args('is_userCreated', {type: () => Boolean, nullable: true})
    is_userCreated?: boolean
  ) {
    return this.categoriesService.findAll(is_userCreated);
  }

  @Query(() => Category, { name: 'category' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.categoriesService.findOne(id);
  }

  @Mutation(() => Category)
  updateCategory(
    @Args('userId')
    userId: number,

    @Args('updateCategoryInput') 
    updateCategoryInput: UpdateCategoryInput
  ) {
    return this.categoriesService.update(userId, updateCategoryInput);
  }

  @Mutation(() => Category)
  removeCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoriesService.remove(id);
  }
}
