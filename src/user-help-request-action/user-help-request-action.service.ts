import { UserHelpRequestActionUpdateInput } from './../@generated/user-help-request-action/user-help-request-action-update.input';
import { UserHelpRequestActionUncheckedCreateInput } from './../@generated/user-help-request-action/user-help-request-action-unchecked-create.input';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserHelpRequestActionService {
  constructor(private prisma: PrismaService){}
  
  async create(createUserHelpRequestActionInput: Prisma.UserHelpRequestActionUncheckedCreateInput) {
    const response = await this.prisma.userHelpRequestAction.create({
      data: createUserHelpRequestActionInput,
    });
    return response;
  }

  findAll() {
    return this.prisma.userHelpRequestAction.findMany({
      include:{
        users: true,
        helpRequests: true
      }
    });
  }

  findOne(id: number) {
    return this.prisma.userHelpRequestAction.findUnique({
      where: { id },
      include:{
        users: true,
        helpRequests: true
      }
    });
  }

  update(id: number, updateUserHelpRequestActionInput: Prisma.UserHelpRequestActionUpdateInput) {
    return this.prisma.userHelpRequestAction.update({
      where: { id }, 
      data: updateUserHelpRequestActionInput
    });
  }

  remove(id: number) {
    return this.prisma.userHelpRequestAction.delete({
      where: { id }
    });
  }
}
