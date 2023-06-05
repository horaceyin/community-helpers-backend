import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserPushTokenUncheckedCreateInput } from 'src/@generated/user-push-token/user-push-token-unchecked-create.input';
import { UserPushTokenUncheckedUpdateInput } from 'src/@generated/user-push-token/user-push-token-unchecked-update.input';
import { PrismaService } from 'src/prisma.service';
import { CreateUserPushTokenInput } from './dto/create-user-push-token.input';
import { UpdateUserPushTokenInput } from './dto/update-user-push-token.input';

@Injectable()
export class UserPushTokenService {
  constructor(private prisma: PrismaService){}
  
  create(createUserPushTokenInput: Prisma.UserPushTokenUncheckedCreateInput) {
    return this.prisma.userPushToken.create({
      data: createUserPushTokenInput
    });
  }

  findAll() {
    return this.prisma.userPushToken.findMany({
      include: {
        user: true
      }
    });
  }

  findMultiple(userId: number){
    return this.prisma.userPushToken.findMany({
      where: {
        userId: userId
      },
      include: {
        user: true
      }
    })
  }

  findOne(userId: number, expoPushToken: string) {
    return this.prisma.userPushToken.findUnique({
      where: {
        userId_expoPushToken: {
          userId: userId,
          expoPushToken: expoPushToken
        }
      }
    });
  }

  update(updateUserPushTokenInput: Prisma.UserPushTokenUncheckedUpdateInput) {
    return this.prisma.userPushToken.update({
      where: {
        userId_expoPushToken: {
          userId: Number(updateUserPushTokenInput.userId),
          expoPushToken: String(updateUserPushTokenInput.expoPushToken)
        }
      },
      data: updateUserPushTokenInput
    });
  }

  remove(userId: number, expoPushToken: string) {
    return this.prisma.userPushToken.delete({
      where: {
        userId_expoPushToken: {
          userId: userId,
          expoPushToken: expoPushToken
        }
      }
    }) ;
  }
}
