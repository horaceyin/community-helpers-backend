import { Injectable } from '@nestjs/common';
import { Context } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UpdateHelpRequestMatchingInput } from './dto/update-help-request-matching.input';

@Injectable()
export class HelpRequestMatchingsService {
  constructor(private prisma: PrismaService){}

  createHelpRequestMatching(createHelpRequestMatchingInput: Prisma.HelpRequestMatchingUncheckedCreateInput) {
    return this.prisma.helpRequestMatching.create({
      data: createHelpRequestMatchingInput,
    })
  }

  findAllHelpRequestMatching() {
    return this.prisma.helpRequestMatching.findMany({
      include: {
        user: true,
        helpRequest: true,
      }
    });
  }

  findOneHelpRequestMatching(id: number) {
    return this.prisma.helpRequestMatching.findUnique({
      where: {id: id},
    });
  }

  updateHelpRequestMatching(id: number, updateHelpRequestMatchingInput: Prisma.HelpRequestMatchingUpdateInput) {
    return this.prisma.helpRequestMatching.update({
      where: {
        id: id,
      },
      data: updateHelpRequestMatchingInput
    })
  }

  removeOneHelpRequestMatching(id: number) {
    return this.prisma.helpRequestMatching.delete({
      where: {id: id},
    });
  }

  async findByUserAndState(state: {state: string}[], @Context() context) {
    const data = await this.prisma.helpRequestMatching.findMany({
      where: {
        userId: context.req.user.userId,
        OR: state
      },
      include: {
        user: true,
        helpRequest: {
          include: {
            helpSeeker: true,
          }
        },
      }
    })

    console.log(data)
    return data;
  }
}
