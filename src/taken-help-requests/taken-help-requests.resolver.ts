import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { TakenHelpRequestsService } from './taken-help-requests.service';
import { TakenHelpRequest } from './entities/taken-help-request.entity';
import { TakenHelpRequestUncheckedCreateInput } from 'src/@generated/taken-help-request/taken-help-request-unchecked-create.input';
import { TakenHelpRequestUncheckedUpdateInput } from 'src/@generated/taken-help-request/taken-help-request-unchecked-update.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AppService } from 'src/app.service';
import { UserPushTokenService } from 'src/user-push-token/user-push-token.service';

@Resolver(() => TakenHelpRequest)
export class TakenHelpRequestsResolver {
  constructor(
    private readonly takenHelpRequestsService: TakenHelpRequestsService,
    private readonly appService: AppService,
    private readonly userPushTokenService: UserPushTokenService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => TakenHelpRequest)
  async HelperAcceptHelpRequst(
    @Context() context,
    @Args('createTakenHelpRequestInput') 
    createTakenHelpRequestInput: TakenHelpRequestUncheckedCreateInput,
  ) {

    const action = await this.takenHelpRequestsService.create(createTakenHelpRequestInput);

    if(action){

      const pushTokens = await this.userPushTokenService.findMultiple(action.helpRequest.helpSeekerId)

      let tokens: string[] = []
      
      pushTokens.forEach((token)=>{
        tokens.push(token.expoPushToken)
      })

      await this.appService.sendPush(tokens, "Communtiy Helper App", "You have got a new match")
    }

    return action
  }

  @Query(() => [TakenHelpRequest], { name: 'takenHelpRequests' })
  findAll() {
    return this.takenHelpRequestsService.findAll();
  }

  @Query(() => TakenHelpRequest, { name: 'takenHelpRequest' })
  findOne(
    @Args('userId', { type: () => Int }) 
    userId: number,

    @Args('helpRequestId', { type: () => Int })
    HelpRequestId: number,
  ) {
    return this.takenHelpRequestsService.findOne(userId, HelpRequestId);
  }

  @Mutation(() => TakenHelpRequest)
  updateTakenHelpRequest(
    @Args('userId', { type: () => Int }) 
    userId: number,

    @Args('helpRequestId', { type: () => Int })
    HelpRequestId: number,

    @Args('updateTakenHelpRequestInput') 
    updateTakenHelpRequestInput: TakenHelpRequestUncheckedUpdateInput) {
    return this.takenHelpRequestsService.update(userId, HelpRequestId, updateTakenHelpRequestInput);
  }

  @Mutation(() => TakenHelpRequest)
  removeTakenHelpRequest(
    @Args('userId', { type: () => Int }) 
    userId: number,

    @Args('helpRequestId', { type: () => Int })
    HelpRequestId: number,
  ) {
    return this.takenHelpRequestsService.remove(userId, HelpRequestId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [TakenHelpRequest])
  findByUserAndState(
    @Args('state', { type: () => [String] } ) 
    state: [string],
    @Context() context
  ) {
    console.log("querying")
    const states: {state: string}[] = []

    for(let i = 0; i < state.length; i++){
      states.push({
        state: state[i]
      })
    }

    return this.takenHelpRequestsService.findByUserAndState(states, context);
  }

  @Mutation(() => Boolean)
  sendPushNotification(
    @Args('tokens', {type: ()=> [String]}) 
    tokens: [string],

    @Args('title', {type: ()=> String})
    title: string,

    @Args('body', {type: ()=> String})
    body: string
  ) {
    return this.appService.sendPush(tokens, title, body)
  }


  @Mutation(() => TakenHelpRequest)
  helpSeekerCommitJob(
    @Args('userId', {type: ()=> Int})
    userId : number,

    @Args('helpRequestId', {type: ()=> Int})
    helpRequestId : number,
  ){
    return this.takenHelpRequestsService.commit(userId, helpRequestId)
  }
}
