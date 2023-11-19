import { Module } from '@nestjs/common';
import { UserModel } from './user.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersResolver } from './users.resolver';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserModel]),
    ],
    controllers: [],
    providers: [UsersResolver],
})
export class UsersModule { }
