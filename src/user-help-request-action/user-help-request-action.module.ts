import { Module } from '@nestjs/common';
import { UserHelpRequestActionService } from './user-help-request-action.service';
import { UserHelpRequestActionResolver } from './user-help-request-action.resolver';
import { PrismaService } from './../prisma.service';

@Module({
  providers: [UserHelpRequestActionResolver, UserHelpRequestActionService, PrismaService]
})
export class UserHelpRequestActionModule {}
