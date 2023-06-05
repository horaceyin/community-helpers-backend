import { Module } from '@nestjs/common';
import { InterestsService } from './interests.service';
import { InterestsResolver } from './interests.resolver';
import { PrismaService } from 'src/prisma.service';
import { CategoriesService } from 'src/categories/categories.service';

@Module({
  providers: [InterestsResolver, InterestsService, PrismaService, CategoriesService]
})
export class InterestsModule {}
