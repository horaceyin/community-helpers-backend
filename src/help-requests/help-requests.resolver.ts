import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Context, Int } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HelpRequestMatchingsService } from 'src/help-request-matchings/help-request-matchings.service';
import { CreateHelpRequestInput } from './dto/create-help-request.input';
import { UpdateHelpRequestInput } from './dto/update-help-request.input';
import { HelpRequest } from './entities/help-request.entity';
import { RecommendedHelpRequest } from './entities/recommended-help-request.entity';
import { HelpRequestsService } from './help-requests.service';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@Resolver(of => HelpRequest)
export class HelpRequestsResolver {
  constructor(
    private helpRequestsService: HelpRequestsService, 
    private helpRequestMatchingsService: HelpRequestMatchingsService
  ) {}

  // @UseGuards(JwtAuthGuard)
  @Query(returns => [HelpRequest])
  helpRequests(
  @Args('skip', { type: () => Int , nullable: true}) 
  skip?: number,

  @Args('take', { type: () => Int, nullable: true}) 
  take?: number,

  @Args('is_taken', { type: () => Boolean, nullable: true})
  is_taken?: boolean
  ) {
    return this.helpRequestsService.findAllHelpRequest(skip, take, is_taken);
  }

  // @UseGuards(JwtAuthGuard)
  @Query(returns => HelpRequest)
  helpRequest(
    @Args('helpRequestId') helpRequestId: number,
    @Context() context
    ) {
    console.log(context);
    return this.helpRequestsService.findOneHelpRequest(helpRequestId);
  }

  @Query(returns => [RecommendedHelpRequest])
  getRecommendedHelpRequests(@Args('userId') userId: number, 
                             @Args('start') start: number, 
                             @Args('end') end: number, 
                             @Context() context) {
    console.log(context);
    return this.helpRequestsService.getRecommendedHelpRequests(userId, start, end);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => HelpRequest)
  createHelpRequest(
    @Context() context,
    @Args('createHelpRequestInput') createHelpRequestInput: CreateHelpRequestInput, 
    @Args('files', { type: () => [GraphQLUpload]}) files: [FileUpload],
  ) {
    console.log("mutation start")
    return this.helpRequestsService.createHelpRequest(context, createHelpRequestInput, files)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => HelpRequest)
  updateHelpRequest(@Args('updateHelpRequestInput') updateHelpRequestInput: UpdateHelpRequestInput){
    return this.helpRequestsService.updateHelpRequest(updateHelpRequestInput.id, updateHelpRequestInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => HelpRequest)
  deleteHelpRequest(@Args('helpRequestId') helpRequestId: number){
    return this.helpRequestsService.removeOneHelpRequest(helpRequestId);
  }
}
