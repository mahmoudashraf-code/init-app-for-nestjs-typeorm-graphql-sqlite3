import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      path: '/',
      autoSchemaFile: 'schema.gql',
      playground: {
        settings: {
          'editor.theme': 'light',
        },
      },
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'mydatabase.db',
      synchronize: true,
      entities: ['dist/**/*.model.js'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
