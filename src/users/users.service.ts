import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Context } from '@nestjs/graphql';
import { UserUpdateInput } from 'src/@generated/user/user-update.input';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService){}

  async create(createUserInput: Prisma.UserCreateInput) {
    console.log("createUserInput: ");
    console.log({createUserInput});

    return await this.prisma.user.create({
      data: createUserInput,
    })

  }

  findAll() {
    return this.prisma.user.findMany({
      include: {
        userCreatedHelpRequests: {
          include: {
            helpRequestCategories: true,
          }
        },
        takenHelpRequests: {
          include:{
            user: true
          }
        },
        helpRequestMatchings: {
          include: {
            helpRequest: true,
          }
        },
      }
    });
  }

  async findOne(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
      include: {
        userCreatedHelpRequests: {
          include: {
            helpRequestCategories: true,
          }
        },
        takenHelpRequests: {
          include:{
            user: true
          }
        },
        helpRequestMatchings: {
          include: {
            helpRequest: true,
          }
        },
        interests: true
      }
    })

    console.log(user)
    return user
  }

  async findByUserId(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        userCreatedHelpRequests: {
          include: {
            helpRequestCategories: true,
          }
        },
        takenHelpRequests: {
          include:{
            user: true
          }
        },
        helpRequestMatchings: {
          include: {
            helpRequest: true,
          }
        },
        interests: {
          include: {
            category: true,
          }
        }
      },
    })

    console.log(user)
    return user
  }

  async findMe(@Context() context) {
    const user = await this.prisma.user.findUnique({
      where: { id: context.req.user.userId },
      include: {
        userCreatedHelpRequests: {
          include: {
            helpRequestCategories: true,
            takenHelpRequests: {
              include: {
                user: true,
                helpRequest: true
              }
            },
            helpSeeker: true
          }
        },
        takenHelpRequests: {
          include:{
            user: true
          }
        },
        helpRequestMatchings: {
          include: {
            helpRequest: {
              include: {
                helpRequestCategories: true
              }
            },
          }
        },
        interests: true
      }
    })

    console.log(user)
    return user
  }

  update(id: number, updateUserInput: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: {
        id: id
      },
      data: updateUserInput
    });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
