import {
  forwardRef,
  Inject,
  Injectable,
  UseFilters,
  UseGuards,
  Logger,
} from "@nestjs/common";
import { Context } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { CreateHelpRequestMatchingInput } from "src/help-request-matchings/dto/create-help-request-matching.input";
import { PrismaService } from "src/prisma.service";
import { RecommenderService } from "src/recommender/recommender.service";
import { UsersService } from 'src/users/users.service';
import { RecommendedHelpRequestCacheService } from 'src/recommended-help-request-cache/recommended-help-request-cache.service';
import { UpdateHelpRequestInput } from "./dto/update-help-request.input";
import { HelpRequest } from "./entities/help-request.entity";
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { CreateRecommendedHelpRequestCacheInput } from 'src/recommended-help-request-cache/dto/create-recommended-help-request-cache.input';

import { FileUpload } from 'graphql-upload';
import * as Storage from 'azure-storage'
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class HelpRequestsService {
  private readonly logger = new Logger(RecommenderService.name);
  // async findAll(): Promise<HelpRequest[]> {
  //   const helpRequest = new HelpRequest();
  //   helpRequest.id = 1;
  //   helpRequest.category = "helpRequest category";
  //   helpRequest.creationDatetime =  new Date("2019-01-16");
  //   helpRequest.helpRequestDatetime = new Date("2019-01-16");
  //   helpRequest.title = "XX";
  //   helpRequest.description = "helpRequest description";

  //   return [helpRequest];
  // }
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => RecommenderService))
    private recommenderService: RecommenderService,
    private recommendedHelpRequestCacheService: RecommendedHelpRequestCacheService,
    private usersService: UsersService,
    private readonly httpService: HttpService,
  ) { }

  async createHelpRequest(
    @Context() context,
    createHelpRequestInput: Prisma.HelpRequestUncheckedCreateInput,
    files: [FileUpload],
  ) {
    // console.log("Start context");
    // console.log(context.req.user.userId);
    // console.log("END context");
    createHelpRequestInput.helpSeekerId = context.req.user.userId;

    let images = []
    if(files){
      for (let i = 0; i < files.length; i++) {
        const blobService = Storage.createBlobService(process.env.AZURE_STORAGE_CONNECTION_STRING)
        
        const url = process.env.AZURE_BLOB_BASE_URL
        const { createReadStream, filename, mimetype } = await files[i];
    
        const fileStream = createReadStream()
            
        const fileType = filename.split('.').slice(-1)
        const newFileName = uuidv4() + "." +fileType
        const container = "help-request"
        let streamSize = parseInt(context.req.headers['content-length'])
    
        await blobService.createBlockBlobFromStream(container,newFileName,fileStream,streamSize, (error,response) => {
            if(!error){
              console.log(response)
              return
            }
        })
  
        images.push(`${url}${container}/${newFileName}`)
      }
    }


    createHelpRequestInput.images = images
    const createdHelpRequest = await this.prisma.helpRequest.create({
      data: createHelpRequestInput,
      include: {
        takenHelpRequests: true,
        helpSeeker: true,
        helpRequestMatchings: true,
      },
    });

    const matchedUserIds =
      await this.recommenderService.generateRecommendedMatchingByHelpRequestId(
        createdHelpRequest.id,
        context.req.user.userId
      );

    // Create a HelpRequestMatching
    // var createdHelpRequestMatchings = new Array();
    // for (let userId of matchedUserIds) {
    //   const createHelpRequestMatchingInput =
    //     new CreateHelpRequestMatchingInput();
    //   createHelpRequestMatchingInput.character = "Helper";
    //   createHelpRequestMatchingInput.priority = 1;
    //   createHelpRequestMatchingInput.state = "pending";
    //   createHelpRequestMatchingInput.userId = userId;
    //   createHelpRequestMatchingInput.helpRequestId = createdHelpRequest.id;

    //   createdHelpRequestMatchings.push(
    //     await this.helpRequestMatchingsService.createHelpRequestMatching(
    //       createHelpRequestMatchingInput
    //     )
    //   );
    // }

    console.log({
      ...createdHelpRequest,
      //helpRequestMatchings: createdHelpRequestMatchings,
    });
    return {
      ...createdHelpRequest,
      //helpRequestMatchings: createdHelpRequestMatchings,
    };
  }

  findAllHelpRequest(skip?: number, take?: number, is_taken?: boolean){
    let filter = {};
    if(is_taken != null){
      filter = {
        is_taken: is_taken
      }
    }else{
    }
    if(!skip && !take){
      return this.prisma.helpRequest.findMany({
        include: {
          takenHelpRequests: {
            include: {
              user: true
            }
          },
          helpSeeker: true,
          helpRequestMatchings: true,
          userHelpRequestActions: true,
        },
        where: filter
      })
    }else{
      if(isNaN(skip)){
        return this.prisma.helpRequest.findMany({
          take: take,
          include: {
            takenHelpRequests: {
              include: {
                user: true
              }
            },
            helpSeeker: true,
            helpRequestMatchings: true,
            userHelpRequestActions: true
          },
          where: filter
        });
      }
  
      return this.prisma.helpRequest.findMany({
        take: take,
        skip: skip,
        include: {
          takenHelpRequests: {
            include: {
              user: true
            }
          },
          helpSeeker: true,
          helpRequestMatchings: true,
          userHelpRequestActions: true
        },
        where: filter
      });
    }

  }
  
  async findOneHelpRequest(id: number) {
    const data = await this.prisma.helpRequest.findUnique({
      where: { id: id },
      include: {
        takenHelpRequests: {
          include: {
            user: true,
            helpRequest: true,
          },
        },
        helpRequestMatchings:  {
          include: {
            user: true,
            helpRequest: true,
          },
        },
        userHelpRequestActions: true
      },
    });
    return data;
  }

  
  async getRecommendedHelpRequests(userId: number, start: number, end: number) {
    var cached = true;
    console.log(`process.env.RECOMMENDER_SYSTEM_URL: ${process.env.RECOMMENDER_SYSTEM_URL}`)
    const { data } = await firstValueFrom(
      this.httpService.get(`${process.env.RECOMMENDER_SYSTEM_URL}/modelVersion/`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    const modelVersion = data;
    console.log(`modelVersion: ${modelVersion}`);

    const recommendedHelpRequestCache =
      await this.recommendedHelpRequestCacheService.findByUserIdAndModelVersion(userId, modelVersion, start, end);

    if ( recommendedHelpRequestCache.length == 0 ) {
      cached = false;
    }
    const cachedOrder = recommendedHelpRequestCache.map(cache => {return cache.recommendationOrder});
    const cachedHelpRequestIds = recommendedHelpRequestCache.map(cache => {return cache.helpRequestId});
    console.log(`cachedOrder: ${cachedOrder}`)
    console.log(`cachedHelpRequestIds: ${cachedHelpRequestIds}`)
    for (let index = start+1; index <= end; index++) {
      if (!cachedOrder.includes(index)) {
        cached = false;
        break
      }
    }
    console.log(`cached: ${cached}`);

    var recommendedHelpRequestIds = null
    if (!cached) {
      recommendedHelpRequestIds = 
        await this.recommenderService.getRecommendedHelpRequestsByUserId(userId, start, end);
      if (recommendedHelpRequestIds[0] == -1) {
        console.log(`userId: ${userId} is a new which current not exist in the RS model`);
        console.log(`current recommendedHelpRequestIds is based on userId: ${userId} 's user features`);
        const user = await this.usersService.findByUserId(userId);
        console.log("user");
        console.log(user.interests);
        var userInterest = "";
        for (let index = 0; index < user.interests.length; index++){
          userInterest += user.interests[index].category.name;
          userInterest += ','
        }
        if (userInterest != ""){
          userInterest = userInterest.slice(0, -1);
        }
        const currentdate:any = Date.now(); 
        const dateOfBirth:any = user.dateOfBirth 
        const ageDate = new Date(Math.abs(currentdate - dateOfBirth));
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);
        recommendedHelpRequestIds = 
          await this.recommenderService.getRecommendedHelpRequestsByUserFeatures(age, user.gender, user.district, userInterest, start, end);
      }
      for (let index = 0; index < recommendedHelpRequestIds.length; index++) {
        if (!cachedHelpRequestIds.includes(recommendedHelpRequestIds[index])) {
          var createRecommendedHelpRequestCacheInput = new CreateRecommendedHelpRequestCacheInput();
          createRecommendedHelpRequestCacheInput.modelVersion = modelVersion;
          createRecommendedHelpRequestCacheInput.userId = userId;
          createRecommendedHelpRequestCacheInput.helpRequestId = recommendedHelpRequestIds[index];
          createRecommendedHelpRequestCacheInput.recommendationOrder = (start+index+1);
          await this.recommendedHelpRequestCacheService.create(createRecommendedHelpRequestCacheInput);
        }
      }
    }
    else {
      recommendedHelpRequestIds = cachedHelpRequestIds.sort(
        (a, b) => cachedOrder[cachedHelpRequestIds.indexOf(a)] - cachedOrder[cachedHelpRequestIds.indexOf(b)]);
    }

    var recommendedHelpRequest = await this.prisma.helpRequest.findMany({
      where: {
        id: { in: recommendedHelpRequestIds },
      },
      include: {
        helpSeeker: true,
        takenHelpRequests: {
          include: {
            user: true
          }
        },
        userHelpRequestActions: {
          where: {
            userId: userId,
            actionType: {in: ['like', 'dislike']}
          }
        }
      },
    })
    var recommendedHelpRequestWithRecommendationOrder = recommendedHelpRequest.map(helpRequest => {
      const serHelpRequestActionType = helpRequest.userHelpRequestActions.map(action => action.actionType);
      console.log(serHelpRequestActionType)
      var liked = false;
      var disliked = false;
      if (serHelpRequestActionType.includes('like')){
        liked = true
      }
      if (serHelpRequestActionType.includes('dislike')){
        disliked = true
      }
      return { 
        ...helpRequest, 
        recommendationOrder: start + recommendedHelpRequestIds.indexOf(helpRequest.id) + 1,
        isLike: liked,
        isDislike: disliked
      }
    });

    // Sort by recommendationOrder
    recommendedHelpRequestWithRecommendationOrder = 
      recommendedHelpRequestWithRecommendationOrder.sort(
        (a, b) => a.recommendationOrder - b.recommendationOrder);
    
    console.log(recommendedHelpRequestWithRecommendationOrder);
    return recommendedHelpRequestWithRecommendationOrder
  }

  updateHelpRequest(
    id: number,
    updateHelpRequestInput: Prisma.HelpRequestUpdateInput
  ) {
    // console.log({id});
    // console.log({updateHelpRequestInput});

    return this.prisma.helpRequest.update({
      where: {
        id: id,
      },
      data: updateHelpRequestInput,
    });
  }

  removeOneHelpRequest(id: number) {
    return this.prisma.helpRequest.delete({
      where: { id: id },
    });
  }
}
