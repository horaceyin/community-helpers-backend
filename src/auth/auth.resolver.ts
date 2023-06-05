import { LoginUserInput } from './dto/login-user.input';
import { AuthService } from './auth.service';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { LoginResponse } from './dto/login-response';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { GqlAuthGuard } from './gql-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { UserPushTokenService } from 'src/user-push-token/user-push-token.service';
import { UserPushTokenUncheckedCreateInput } from 'src/@generated/user-push-token/user-push-token-unchecked-create.input';
import { JwtAuthGuard } from './jwt-auth.guard';

@Resolver()
export class AuthResolver {
    constructor(
        private authService: AuthService,
        private expoPushTokenService: UserPushTokenService
    ){}

    @Mutation(() => LoginResponse)
    @UseGuards(GqlAuthGuard)
    async login(
        @Context() context,
        @Args('loginUserInput') loginUserInput: LoginUserInput,
        @Args('expoPushToken', { type: () => String, nullable: true}) expoPushToken?: string
    ){ 
        const user = await this.authService.login(context.user)

        if(user.access_token && expoPushToken){
            const exist_token = await this.expoPushTokenService.findOne(user.user.id, expoPushToken)
            if(!exist_token){
                let data = new UserPushTokenUncheckedCreateInput()
                data.userId = user.user.id
                data.expoPushToken = expoPushToken
        
                await this.expoPushTokenService.create(data);
            }else{
                return user
            }
        }

        return user
    }

    @Mutation(() => User)
    signup(
        @Context() context,
        @Args('loginUserInput') loginUserInput: LoginUserInput,
        @Args('file', { type: () => GraphQLUpload}) file: FileUpload,
    ){  
        return this.authService.signup(context, loginUserInput, file);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Boolean)
    async signout(
        @Context() context,
        @Args('expoPushToken', { type: () => String, nullable: true}) 
        expoPushToken?: string
    ){  
        try {
            const user = await this.expoPushTokenService.remove(context.req.user.userId, expoPushToken)

            if(user){
                return true
            }else{
                return false
            }
        }catch{
            return true
        }
    }
}
