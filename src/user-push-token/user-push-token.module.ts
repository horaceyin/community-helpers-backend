import { Module } from '@nestjs/common';
import { UserPushTokenService } from './user-push-token.service';
import { UserPushTokenResolver } from './user-push-token.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [UserPushTokenResolver, UserPushTokenService, PrismaService]
})
export class UserPushTokenModule {}
