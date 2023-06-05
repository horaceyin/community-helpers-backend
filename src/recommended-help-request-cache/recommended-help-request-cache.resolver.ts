import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RecommendedHelpRequestCacheService } from './recommended-help-request-cache.service';
import { RecommendedHelpRequestCache } from './entities/recommended-help-request-cache.entity';
import { CreateRecommendedHelpRequestCacheInput } from './dto/create-recommended-help-request-cache.input';
import { UpdateRecommendedHelpRequestCacheInput } from './dto/update-recommended-help-request-cache.input';

@Resolver(() => RecommendedHelpRequestCache)
export class RecommendedHelpRequestCacheResolver {
  constructor(private readonly recommendedHelpRequestCacheService: RecommendedHelpRequestCacheService) {}

  @Mutation(() => RecommendedHelpRequestCache)
  createRecommendedHelpRequestCache(@Args('createRecommendedHelpRequestCacheInput') createRecommendedHelpRequestCacheInput: CreateRecommendedHelpRequestCacheInput) {
    return this.recommendedHelpRequestCacheService.create(createRecommendedHelpRequestCacheInput);
  }

  @Query(() => [RecommendedHelpRequestCache], { name: 'recommendedHelpRequestCache' })
  findAll() {
    return this.recommendedHelpRequestCacheService.findAll();
  }

  @Query(() => RecommendedHelpRequestCache, { name: 'recommendedHelpRequestCache' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.recommendedHelpRequestCacheService.findOne(id);
  }

  @Mutation(() => RecommendedHelpRequestCache)
  updateRecommendedHelpRequestCache(@Args('updateRecommendedHelpRequestCacheInput') updateRecommendedHelpRequestCacheInput: UpdateRecommendedHelpRequestCacheInput) {
    return this.recommendedHelpRequestCacheService.update(updateRecommendedHelpRequestCacheInput.id, updateRecommendedHelpRequestCacheInput);
  }

  @Mutation(() => RecommendedHelpRequestCache)
  removeRecommendedHelpRequestCache(@Args('id', { type: () => Int }) id: number) {
    return this.recommendedHelpRequestCacheService.remove(id);
  }
}
