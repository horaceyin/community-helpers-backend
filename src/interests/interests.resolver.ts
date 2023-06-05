import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InterestsService } from './interests.service';
import { Interest } from './entities/interest.entity';
import { CreateInterestInput } from './dto/create-interest.input';
import { UpdateInterestInput } from './dto/update-interest.input';
import { CategoriesService } from 'src/categories/categories.service';

@Resolver(() => Interest)
export class InterestsResolver {
  constructor(
    private readonly interestsService: InterestsService,
    ) {}

  @Mutation(() => Interest)
  createInterest(
    @Args('createInterestInput') 
    createInterestInput: CreateInterestInput
  ) {
    return this.interestsService.create(createInterestInput);
  }

  @Query(() => [Interest], { name: 'interests' })
  findAll() {
    return this.interestsService.findAll();
  }

  @Query(() => Interest, { name: 'interest' })
  findOne(
    @Args('userId', { type: () => Int }) 
    userId: number, 
    
    @Args('categoryId', { type: () => Int }) 
    categoryId: number
  ) {
    return this.interestsService.findOne(userId, categoryId);
  }

  @Mutation(() => Interest)
  updateInterest(
    @Args('updateInterestInput') 
    updateInterestInput: UpdateInterestInput
  ) {
    return this.interestsService.update(updateInterestInput);
  }

  @Mutation(() => Interest)
  removeInterest(    
    @Args('userId', { type: () => Int }) 
    userId: number, 

    @Args('categoryId', { type: () => Int }) 
    categoryId: number
  ) {
    return this.interestsService.remove(userId, categoryId);
  }

  @Mutation(() => [Interest])
  createInterestWithStringBatch(
    @Args('userId', { type: () => Int }) 
    userId: number,

    @Args('categories', { type: () => [String]})
    categories: [string]
  ){
    return this.interestsService.createInterestWithStringBatch(userId, categories)
  }
}
