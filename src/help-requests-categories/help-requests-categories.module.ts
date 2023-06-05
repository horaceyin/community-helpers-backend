import { Module } from '@nestjs/common';
import { HelpRequestsCategoriesService } from './help-requests-categories.service';
import { HelpRequestsCategoriesResolver } from './help-requests-categories.resolver';
import { PrismaService } from 'src/prisma.service';
import { CategoriesService } from 'src/categories/categories.service';

@Module({
  providers: [HelpRequestsCategoriesResolver, HelpRequestsCategoriesService, PrismaService, CategoriesService]
})
export class HelpRequestsCategoriesModule {}
