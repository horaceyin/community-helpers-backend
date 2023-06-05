import { Injectable } from '@nestjs/common';
import { Context } from '@nestjs/graphql';
import { TakenHelpRequestUncheckedCreateInput } from 'src/@generated/taken-help-request/taken-help-request-unchecked-create.input';
import { TakenHelpRequestUncheckedUpdateInput } from 'src/@generated/taken-help-request/taken-help-request-unchecked-update.input';
import { TakenHelpRequestUpdateInput } from 'src/@generated/taken-help-request/taken-help-request-update.input';
import { PrismaService } from 'src/prisma.service';
import { CreateTakenHelpRequestInput } from './dto/create-taken-help-request.input';
import { UpdateTakenHelpRequestInput } from './dto/update-taken-help-request.input';

@Injectable()
export class TakenHelpRequestsService {
  constructor(private prisma: PrismaService){}

  async create(createTakenHelpRequestInput: TakenHelpRequestUncheckedCreateInput) {

    const takenHelpRequest = await this.findOne(
      createTakenHelpRequestInput.userId,
      createTakenHelpRequestInput.helpRequestId
      )

    if(takenHelpRequest){
      console.log(takenHelpRequest);
      throw new Error(`Help Request Already Taken By ${createTakenHelpRequestInput.userId}`)
    }

    return this.prisma.takenHelpRequest.create({
      data: createTakenHelpRequestInput,
      include: {
        helpRequest: true
      }
    });

  }

  findAll() {
    return this.prisma.takenHelpRequest.findMany({
      include:{
        user: true,
        helpRequest: true
      }
    });
  }

  async findOne(userId: number, helpRequestId: number) {
    return this.prisma.takenHelpRequest.findUnique({
      where: {
        userId_helpRequestId:{
          userId: userId,
          helpRequestId: helpRequestId
        }
      },
      include: {
        user: true,
        helpRequest: true
      }
    });
  }

  update(userId: number, helpRequestId: number, updateTakenHelpRequestInput: TakenHelpRequestUncheckedUpdateInput) {
    return this.prisma.takenHelpRequest.update({
      where: {
        userId_helpRequestId:{
          userId: userId,
          helpRequestId: helpRequestId
        }
      },
      data: updateTakenHelpRequestInput
    });
  }

  remove(userId: number, helpRequestId: number,) {
    return this.prisma.takenHelpRequest.delete({
      where: {
        userId_helpRequestId:{
          userId: userId,
          helpRequestId: helpRequestId
        }
      }
    });
  }

  async findByUserAndState(state: {state: string}[], @Context() context) {
    const data = await this.prisma.takenHelpRequest.findMany({
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

  async commit(userId: number, helpRequestId: number) {
    const helpRequests = await this.prisma.takenHelpRequest.findMany({
      where:{
        helpRequestId: helpRequestId,
      }
    })

    for(let i = 0; i < helpRequests.length; i++){
      if(helpRequests[i].is_taken == true){
        throw new Error("Help Request is already taken")
      }
    }

    const updatedJob = await this.prisma.takenHelpRequest.update({
      where:{
        userId_helpRequestId:{
          userId: userId,
          helpRequestId: helpRequestId,
        }
      },
      data:{
        is_taken: true,
        state: "ongoing"
      }
    })

    const updateHelpRequest = await this.prisma.helpRequest.update({
      where: {
        id: helpRequestId,
      },
      data:{
        is_taken: true,
      }
    })

    if(updatedJob && updateHelpRequest){
      return updatedJob
    }
  }
}
