import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { HelpRequestCategoryUncheckedCreateInput } from 'src/@generated/help-request-category/help-request-category-unchecked-create.input';
import { HelpRequestCategoryUncheckedUpdateInput } from 'src/@generated/help-request-category/help-request-category-unchecked-update.input';
import { Prisma } from '@prisma/client';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class HelpRequestsCategoriesService {
  constructor(
    private prisma: PrismaService,
    private categoriesService: CategoriesService
    ){}
  
  create(createHelpRequestCategoryInput: Prisma.HelpRequestCategoryUncheckedCreateInput) {
    return this.prisma.helpRequestCategory.create({
      data: createHelpRequestCategoryInput
    });
  }

  async createHelpRequestCategoryWithStringBatch(helpRequestId: number, categories: [string]) {

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

      const data = await this.prisma.helpRequestCategory.create({
        data: {
          helpRequestId: helpRequestId,
          categoryId: categoryId
        }
      })
    }

    return await this.prisma.helpRequestCategory.findMany({
      where: {
        helpRequestId: helpRequestId
      }
    })
    
  }

  findAll() {
    return this.prisma.helpRequestCategory.findMany({});
  }

  findOne(helpRequestId: number, categoryId: number) {
    return this.prisma.helpRequestCategory.findUnique({
      where: {
        helpRequestId_categoryId: {
          helpRequestId: helpRequestId,
          categoryId: categoryId
        }
      }, 
      include: {
        helpRequests: true,
        category: true
      }
    });
  }

  update(updateHelpRequestCategoryInput: Prisma.HelpRequestCategoryUncheckedUpdateInput) {
    return this.prisma.helpRequestCategory.update({
      where: {
        helpRequestId_categoryId: {
          helpRequestId: Number(updateHelpRequestCategoryInput.helpRequestId),
          categoryId: Number(updateHelpRequestCategoryInput.categoryId)
        
      }
    },
    data: updateHelpRequestCategoryInput
    });
  }

  remove(helpRequestId: number, categoryId: number) {
    return this.prisma.helpRequestCategory.delete({
      where: {
        helpRequestId_categoryId: {
          helpRequestId: helpRequestId,
          categoryId: categoryId
        }
      }, 
    });
  }
}
