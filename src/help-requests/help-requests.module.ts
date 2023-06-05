import { forwardRef, Module } from '@nestjs/common';
import { HelpRequestsService } from './help-requests.service';
import { HelpRequestsResolver } from './help-requests.resolver';
import { PrismaService } from 'src/prisma.service';
import { HelpRequestMatchingsService } from 'src/help-request-matchings/help-request-matchings.service';
import { UsersService } from 'src/users/users.service';
import { RecommendedHelpRequestCacheService } from 'src/recommended-help-request-cache/recommended-help-request-cache.service';
import { RecommenderService } from 'src/recommender/recommender.service';
import { RecommenderModule } from 'src/recommender/recommender.module';
import { HttpModule } from '@nestjs/axios'

@Module({
  imports:[forwardRef(() =>RecommenderModule), HttpModule],
  providers: [
    HelpRequestsService, HelpRequestsResolver, PrismaService, 
    HelpRequestMatchingsService, RecommendedHelpRequestCacheService,
    UsersService,
  ],
  exports: [HelpRequestsService]
})
export class HelpRequestsModule {}
