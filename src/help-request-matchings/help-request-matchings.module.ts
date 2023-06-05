import { Module } from '@nestjs/common';
import { HelpRequestMatchingsService } from './help-request-matchings.service';
import { HelpRequestMatchingsResolver } from './help-request-matchings.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [HelpRequestMatchingsResolver, HelpRequestMatchingsService, PrismaService],
  exports: [HelpRequestMatchingsService]
})
export class HelpRequestMatchingsModule {}
