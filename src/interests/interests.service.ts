import { Injectable } from '@nestjs/common';
import { CreateInterestInput } from './dto/create-interest.input';
import { UpdateInterestInput } from './dto/update-interest.input';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class InterestsService {
  constructor(
    private prisma: PrismaService,
    private categoriesService: CategoriesService
  ){}

  create(createInterestInput: Prisma.InterestUncheckedCreateInput) {
    return this.prisma.interest.create({
      data: createInterestInput
    });
  }

  findAll() {
    return this.prisma.interest.findMany({
      include:{
        user: true,
        category: true,
      }
    });
  }

  findOne(userId: number, categoryId: number) {
    return this.prisma.interest.findUnique({
      where:{
        userId_categoryId:{
          userId: userId,
          categoryId: categoryId
        }
      },
      include:{
        user: true,
        category: true,
      }
    });;
  }

  update(updateInterestInput: Prisma.InterestUncheckedUpdateInput) {
    return this.prisma.interest.update({
      where:{
        userId_categoryId:{
          userId: Number(updateInterestInput.userId),
          categoryId: Number(updateInterestInput.categoryId)
        }
      },
      data: updateInterestInput
    });
  }

  remove(userId: number, categoryId: number) {
    return this.prisma.interest.delete({
      where:{
        userId_categoryId:{
          userId: userId,
          categoryId: categoryId
        }
      }
    });
  }

  async createInterestWithStringBatch(userId: number, categories: [string]){
    for(let i = 0; i < categories.length; i++){
      let categoryId: number;

      const category = await this.prisma.category.findFirst({
        where: {
          name: categories[i]
        }
      })

      if(category){
        categoryId = category.id
      }else{
        const new_category = await this.categoriesService.create({
          name: categories[i],
          is_userCreated: true
        })
        categoryId = new_category.id
      }

      if(categoryId == null){
        throw new Error("categort id is null")
      }

      const data = await this.prisma.interest.create({
        data: {
          userId: userId,
          categoryId: categoryId
        }
      })
    }

    return await this.prisma.interest.findMany({
      where:{
        userId: userId
      }
    })
  }
}
