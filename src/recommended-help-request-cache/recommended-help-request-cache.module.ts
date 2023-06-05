import { Module } from '@nestjs/common';
import { RecommendedHelpRequestCacheService } from './recommended-help-request-cache.service';
import { RecommendedHelpRequestCacheResolver } from './recommended-help-request-cache.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [RecommendedHelpRequestCacheResolver, RecommendedHelpRequestCacheService, PrismaService],
  exports: [RecommendedHelpRequestCacheService]
})
export class RecommendedHelpRequestCacheModule {}
