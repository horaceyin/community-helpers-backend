import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { PrismaService } from 'src/prisma.service';
import { identity } from 'rxjs';
import { Prisma } from '@prisma/client';
import { CategoryCreateInput } from 'src/@generated/category/category-create.input';
import { CategoryUpdateInput } from 'src/@generated/category/category-update.input';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService){}
  
  async create(createCategoryInput: Prisma.CategoryCreateInput) {
    
    const category = await this.prisma.category.findFirst({
      where:{
        name: createCategoryInput.name
      }
    }) 

    if(category){
      throw new Error('Categories already exists!')
    }

    return this.prisma.category.create({
      data: createCategoryInput
    });
  }

  findAll(is_userCreated: boolean) {
    let filter = {}

    if(is_userCreated != null){
      filter = {
        is_userCreated: is_userCreated
      }
    }

    return this.prisma.category.findMany({
      where: filter
    });
  }

  findOne(id: number) {
    return this.prisma.category.findUnique({
      where: {
        id: id
      }
    });
  }

  update(id: number, updateCategoryInput: Prisma.CategoryUpdateInput) {
    return this.prisma.category.update({
      where:{
        id: id
      },
      data: updateCategoryInput
    });
  }

  remove(id: number) {
    return this.prisma.category.delete({
      where: {
        id: id
      }
    });
  }
}
