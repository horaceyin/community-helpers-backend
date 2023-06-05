import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HelpRequestsCategoriesService } from './help-requests-categories.service';
import { HelpRequestsCategory } from './entities/help-requests-category.entity';
import { CreateHelpRequestsCategoryInput } from './dto/create-help-requests-category.input';
import { UpdateHelpRequestsCategoryInput } from './dto/update-help-requests-category.input';
import { HelpRequestCategoryUncheckedCreateInput } from 'src/@generated/help-request-category/help-request-category-unchecked-create.input';
import { HelpRequestCategoryUncheckedUpdateInput } from 'src/@generated/help-request-category/help-request-category-unchecked-update.input';

@Resolver(() => HelpRequestsCategory)
export class HelpRequestsCategoriesResolver {
  constructor(private readonly helpRequestsCategoriesService: HelpRequestsCategoriesService) {}

  @Mutation(() => HelpRequestsCategory)
  createHelpRequestsCategory(@Args('createHelpRequestsCategoryInput') createHelpRequestsCategoryInput: HelpRequestCategoryUncheckedCreateInput) {
    return this.helpRequestsCategoriesService.create(createHelpRequestsCategoryInput);
  }

  @Query(() => [HelpRequestsCategory], { name: 'helpRequestsCategories' })
  findAll() {
    return this.helpRequestsCategoriesService.findAll();
  }

  @Query(() => HelpRequestsCategory, { name: 'helpRequestsCategory' })
  findOne(
    @Args('helpRequestId', { type: () => Int }) 
    helpRequestId: number,
    
    @Args('categoryId', { type: () => Int }) 
    categoryId: number
  ) {
    return this.helpRequestsCategoriesService.findOne(helpRequestId, categoryId);
  }

  @Mutation(() => HelpRequestsCategory)
  updateHelpRequestsCategory(
    @Args('updateHelpRequestsCategoryInput') 
    updateHelpRequestsCategoryInput: HelpRequestCategoryUncheckedUpdateInput) {
    return this.helpRequestsCategoriesService.update(updateHelpRequestsCategoryInput);
  }

  @Mutation(() => HelpRequestsCategory)
  removeHelpRequestsCategory(    
    @Args('helpRequestId', { type: () => Int }) 
    helpRequestId: number,

    @Args('categoryId', { type: () => Int }) 
    categoryId: number) {
    return this.helpRequestsCategoriesService.remove(helpRequestId, categoryId);
  }

  @Mutation(() => [HelpRequestsCategory])
  createHelpRequestCategoryWithStringBatch(
    @Args('helpRequestId', { type: () => Int }) 
    helpRequestId: number,

    @Args('categories', { type: () => [String]})
    categories: [string]
  ){
    return this.helpRequestsCategoriesService.createHelpRequestCategoryWithStringBatch(helpRequestId, categories)
  }
}
