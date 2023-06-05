import { PrismaService } from './../prisma.service';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';

@Module({
  providers: [UsersResolver, UsersService, PrismaService],
  exports: [UsersService]
})
export class UsersModule {}
