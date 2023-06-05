import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginUserInput } from './dto/login-user.input';
import * as bcrypt from 'bcrypt';
import { FileUpload } from 'graphql-upload';
import * as Storage from 'azure-storage'
import { v4 as uuidv4 } from 'uuid';
import { log } from 'console';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService, 
        private jwtService: JwtService,
    ){}

    async validateUser(username: string, password: string): Promise<any>{
        const user = await this.usersService.findOne(username);
        const valid = await bcrypt.compare(password, user?.password);

        if(user && valid){ // TODO: more secure
            const {password, ...result} = user;
            return result;
        }

        return null;
    }

   async login(user: User) {
    return {
        access_token: this.jwtService.sign({ 
            username: user.username, 
            sub: user.id
        }),
        user: user,
    }

   }

   async signup(context, loginUserInput: LoginUserInput, file: FileUpload){
    console.log(file)
    const user = await this.usersService.findOne(loginUserInput.username);
    if(user) {
        throw new Error('User already exists!')
    }

    let avatar = null

    const password = await bcrypt.hash(loginUserInput.password, 10)

    if(file){

        const blobService = Storage.createBlobService(process.env.AZURE_STORAGE_CONNECTION_STRING)
        
        const url = process.env.AZURE_BLOB_BASE_URL

        const { createReadStream, filename, mimetype } = file;
    
        const fileStream = createReadStream()
            
        const fileType = filename.split('.').slice(-1)
        const newFileName = uuidv4() + "." +fileType
        const container = "avatar"
        let streamSize = parseInt(context.req.headers['content-length'])
    
        blobService.createBlockBlobFromStream(container,newFileName,fileStream,streamSize, (error,response) => {
            if(!error){
              console.log(response)
              return
            }
          })
    
        avatar = `${url}${container}/${newFileName}`
    }

    //const {interests, ...loginUserInputWithoutInterests} = loginUserInput

    const created_user = await this.usersService.create({
        ...loginUserInput,
        password,
        avatar
    })

    // if(loginUserInput.interests){
    //     for(let i = 0; i < loginUserInput.interests.length; i++){

    //         // const category = await this.prisma.category.findFirst({
    //         //     where: {
    //         //         name: loginUserInput.interests[i]
    //         //     }
    //         // })

    //         const data = new InterestsUncheckedCreateInput()
    //         data.userId = created_user.id
    //         data.categoryId = loginUserInput.interests[i]

    //         await this.interestsService.create(data)

    //     }
    // }

    return created_user
    
   }
}
