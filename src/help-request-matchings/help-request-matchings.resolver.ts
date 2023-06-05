import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { HelpRequestMatchingsService } from './help-request-matchings.service';
import { HelpRequestMatching } from './entities/help-request-matching.entity';
import { CreateHelpRequestMatchingInput } from './dto/create-help-request-matching.input';
import { UpdateHelpRequestMatchingInput } from './dto/update-help-request-matching.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver(() => HelpRequestMatching)
export class HelpRequestMatchingsResolver {
  constructor(private readonly helpRequestMatchingsService: HelpRequestMatchingsService) {}

  @Mutation(() => HelpRequestMatching)
  createHelpRequestMatching(@Args('createHelpRequestMatchingInput') createHelpRequestMatchingInput: CreateHelpRequestMatchingInput) {
    return this.helpRequestMatchingsService.createHelpRequestMatching(createHelpRequestMatchingInput);
  }

  @Query(() => [HelpRequestMatching], { name: 'helpRequestMatchings' })
  findAll() {
    return this.helpRequestMatchingsService.findAllHelpRequestMatching();
  }

  @Query(() => HelpRequestMatching, { name: 'helpRequestMatching' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.helpRequestMatchingsService.findOneHelpRequestMatching(id);
  }

  @Mutation(() => HelpRequestMatching)
  updateHelpRequestMatching(@Args('updateHelpRequestMatchingInput') updateHelpRequestMatchingInput: UpdateHelpRequestMatchingInput) {
    return this.helpRequestMatchingsService.updateHelpRequestMatching(updateHelpRequestMatchingInput.id, updateHelpRequestMatchingInput);
  }

  @Mutation(() => HelpRequestMatching)
  removeHelpRequestMatching(@Args('id', { type: () => Int }) id: number) {
    return this.helpRequestMatchingsService.removeOneHelpRequestMatching(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [HelpRequestMatching])
  findByUserAndState(@Args('state', { type: () => [String] } ) state: [string],  @Context() context) {
    console.log("querying")
    const states: {state: string}[] = []

    for(let i = 0; i < state.length; i++){
      states.push({
        state: state[i]
      })
    }

    return this.helpRequestMatchingsService.findByUserAndState(states, context);
  }
}
