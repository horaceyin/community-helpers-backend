import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from './../users/users.module';
import { LocalStrategy } from './local.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport/dist';
import { JwtModule } from '@nestjs/jwt/dist';
import { UserPushTokenService } from 'src/user-push-token/user-push-token.service';
import { PrismaService } from 'src/prisma.service';
//import { InterestsService } from 'src/interests/interests.service';

@Module({
  imports: [
    PassportModule, 
    UsersModule, 
    JwtModule.register({
      signOptions: {expiresIn: '86400s'},
      secret: 'thisisaserectstring' // process.env.JWT_SECRET
    })
  ],
  providers: [
    AuthService, 
    AuthResolver, 
    LocalStrategy, 
    JwtStrategy, 
    UserPushTokenService, 
    PrismaService,
    //InterestsService
  ]
})
export class AuthModule {}
