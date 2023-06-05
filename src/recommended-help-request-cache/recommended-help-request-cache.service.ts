import { Injectable } from '@nestjs/common';
import { CreateRecommendedHelpRequestCacheInput } from './dto/create-recommended-help-request-cache.input';
import { UpdateRecommendedHelpRequestCacheInput } from './dto/update-recommended-help-request-cache.input';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RecommendedHelpRequestCacheService {
  constructor(private prisma: PrismaService){}
  
  create(createRecommendedHelpRequestCacheInput: Prisma.RecommendedHelpRequestCacheUncheckedCreateInput) {
    // return 'This action adds a new recommendedHelpRequestCache';
    return this.prisma.recommendedHelpRequestCache.create({
      data: createRecommendedHelpRequestCacheInput,
    })
  }

  findAll() {
    // return `This action returns all recommendedHelpRequestCache`;
    return this.prisma.recommendedHelpRequestCache.findMany({
      include: {
        user: true,
        helpRequest: true,
      }
    });
  }

  findOne(id: number) {
    // return `This action returns a #${id} recommendedHelpRequestCache`;
    return this.prisma.recommendedHelpRequestCache.findUnique({
      where: {id: id},
    });
  }

  findByUserIdAndModelVersion(userId: number, modelVersion: string, start: number, end: number) {
    return this.prisma.recommendedHelpRequestCache.findMany({
      where: {
        userId: userId,
        modelVersion: modelVersion,
        recommendationOrder: {
          gt: start,
          lte: end
        }
      },
      include: {
        user: true,
        helpRequest: true,
      }
    });
  }

  update(id: number, updateRecommendedHelpRequestCacheInput: Prisma.RecommendedHelpRequestCacheUpdateInput) {
    // return `This action updates a #${id} recommendedHelpRequestCache`;
    return this.prisma.recommendedHelpRequestCache.update({
      where: {
        id: id,
      },
      data: updateRecommendedHelpRequestCacheInput
    })
  }

  remove(id: number) {
    // return `This action removes a #${id} recommendedHelpRequestCache`;
    return this.prisma.recommendedHelpRequestCache.delete({
      where: {id: id},
    });
  }
}
