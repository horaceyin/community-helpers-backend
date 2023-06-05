import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HelpRequestsModule } from './help-requests/help-requests.module';
import { HelpRequestMatchingsModule } from './help-request-matchings/help-request-matchings.module';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { RecommenderModule } from './recommender/recommender.module';
import { UserHelpRequestActionModule } from './user-help-request-action/user-help-request-action.module';
import { UserActionMiddleware } from './user-action/user-action.middleware';
import { UserHelpRequestActionService } from './user-help-request-action/user-help-request-action.service';
import { PrismaService } from './prisma.service';
import { TakenHelpRequestsModule } from './taken-help-requests/taken-help-requests.module';
import { RecommendedHelpRequestCacheModule } from './recommended-help-request-cache/recommended-help-request-cache.module';
import { ExpoSdkModule } from 'nestjs-expo-sdk';
import { UserPushTokenModule } from './user-push-token/user-push-token.module';
import { CategoriesModule } from './categories/categories.module';
import { HelpRequestsCategoriesModule } from './help-requests-categories/help-requests-categories.module';
import { InterestsModule } from './interests/interests.module';
@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    playground: false,
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
    typePaths: ['src/schema.gql'],
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    sortSchema: true,
    cors: {
      origin: ['http://localhost:3000', 'https://studio.apollographql.com', "*"],
      credentials: true,
    },
  }),
  ExpoSdkModule.forRoot({
    accessToken: process.env.EXPO_ACCESS_TOKEN
  }),
  UsersModule,
  AuthModule,
  HelpRequestsModule,
  HelpRequestMatchingsModule,
  RecommenderModule,
  UserHelpRequestActionModule,
  TakenHelpRequestsModule,
  RecommendedHelpRequestCacheModule,
  UserPushTokenModule,
  CategoriesModule,
  //InterestsModule,
  HelpRequestsCategoriesModule,
  InterestsModule
],
providers: [UserHelpRequestActionService, PrismaService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserActionMiddleware).forRoutes("graphql");
  }
}
