import { Query, Resolver } from '@nestjs/graphql';
import { RecommenderService } from './recommender.service';

@Resolver()
export class RecommenderResolver {
  constructor(
    private recommenderService: RecommenderService
  ) {}
  
  // @Query()
  // generateRecommendedMatchingByUserId(): any {
  //   return this.recommenderService.generateRecommendedMatchingByUserId(6);
  // }

  @Query(returns => [Number])
  test(): any {
    return this.recommenderService.getRecommendedHelpRequestsByUserFeatures(24,"Male","Islands","R&B",0,10);
  }

}
