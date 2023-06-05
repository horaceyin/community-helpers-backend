import { Module } from '@nestjs/common';
import { TakenHelpRequestsService } from './taken-help-requests.service';
import { TakenHelpRequestsResolver } from './taken-help-requests.resolver';
import { PrismaService } from 'src/prisma.service';
import { AppService } from 'src/app.service';
import { UserPushTokenService } from 'src/user-push-token/user-push-token.service';
import { HelpRequestsService } from 'src/help-requests/help-requests.service';
import { RecommenderService } from 'src/recommender/recommender.service';
import { RecommendedHelpRequestCacheService } from 'src/recommended-help-request-cache/recommended-help-request-cache.service';
import { UsersService } from 'src/users/users.service';
import { HttpService } from '@nestjs/axios';

@Module({
  providers: [
    TakenHelpRequestsResolver, 
    TakenHelpRequestsService, 
    PrismaService, 
    AppService, 
    UserPushTokenService]
})
export class TakenHelpRequestsModule {}
