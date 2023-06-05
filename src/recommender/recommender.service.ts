import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { HelpRequestsService } from 'src/help-requests/help-requests.service';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

const RECOMMENDER_SYSTEM_URL = 'http://woodyw2.ddns.net'

@Injectable()
export class RecommenderService {
  private readonly logger = new Logger(RecommenderService.name);
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => HelpRequestsService))
    private helpRequestsService: HelpRequestsService,
    private usersService: UsersService,
    private readonly httpService: HttpService,
  ){}

  async generateRecommendedMatchingByUserId(userId: number){
    // Return random helpRequestId
    const allHelpRequests = await this.helpRequestsService.findAllHelpRequest()
    const shuffledAllHelpRequests = allHelpRequests.sort(() => 0.5 - Math.random());
    const n = (shuffledAllHelpRequests.length > 5) ? 5 : shuffledAllHelpRequests.length;
    const sampledAllHelpRequests = shuffledAllHelpRequests.slice(0, n);
    console.log(sampledAllHelpRequests.map(helpRequest => helpRequest.id))
    return sampledAllHelpRequests.map(helpRequest => helpRequest.id);
  }

  async getRecommendedHelpRequestsByUserId(userId: number, start: number, end: number){
    console.log(`Called getRecommendedHelpRequestsByUserId(${userId}, ${start}, ${end}) from RecommenderService`)
    console.log(`process.env.RECOMMENDER_SYSTEM_URL: ${process.env.RECOMMENDER_SYSTEM_URL}`)
    const { data } = await firstValueFrom(
      this.httpService.get(`${RECOMMENDER_SYSTEM_URL}/recommendItem/${userId}?start=${start}&end=${end}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    // console.log(data)
    return data.map(id => { return parseInt(id, 10); });
  }

  async getRecommendedHelpRequestsByUserFeatures(age: number, gender: string, 
                                                 userDistrict: string, userInterest: string, 
                                                 start: number, end: number){
    console.log(`Called getRecommendedHelpRequestsByUserFeatures(${age}, ${gender}, ${userDistrict}, ${start}, ${end}) from RecommenderService`)
    const userFeatures = {
      'age': age,
      'gender': gender,
      'userDistrict': userDistrict,
      'userInterest': userInterest,
    }
    const { data } = await firstValueFrom(
      this.httpService.post(`${RECOMMENDER_SYSTEM_URL}/recommendItemForNewUser/?start=${start}&end=${end}`, userFeatures).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    // console.log(data)
    return data.map(id => { return parseInt(id, 10); });
  }

  async generateRecommendedMatchingByHelpRequestId(helpRequestId: number, seekerId: number){
    // Return random userId
    const allUsers = await this.usersService.findAll();

    console.log("Before remove seeker");
    console.log(allUsers);
    const indexOfUser = allUsers.findIndex((user) => {
      return user.id === seekerId;
    });
    if (indexOfUser !== -1) {
      allUsers.splice(indexOfUser, 1);
    }
    console.log("After remove seeker");
    console.log(allUsers);

    const shuffledAllUsers = allUsers.sort(() => 0.5 - Math.random());
    const n = (shuffledAllUsers.length > 5) ? 5 : shuffledAllUsers.length;
    const sampledAllUsers = shuffledAllUsers.slice(0, n);
    console.log(sampledAllUsers.map(helpRequest => helpRequest.id))
    return sampledAllUsers.map(helpRequest => helpRequest.id);
  }

}
