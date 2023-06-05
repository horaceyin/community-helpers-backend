import { forwardRef, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'
import { RecommenderService } from './recommender.service';
import { RecommenderResolver } from './recommender.resolver';
import { PrismaService } from 'src/prisma.service';
import { HelpRequestsService } from 'src/help-requests/help-requests.service';
import { HelpRequestMatchingsService } from 'src/help-request-matchings/help-request-matchings.service';
import { HelpRequestsModule } from 'src/help-requests/help-requests.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[forwardRef(() =>HelpRequestsModule), UsersModule, HttpModule],
  providers: [
    RecommenderService, RecommenderResolver, PrismaService,
    ],
  exports: [RecommenderService]
})
export class RecommenderModule {}
