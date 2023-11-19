import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './user.model';

@Resolver(() => UserModel)
export class UsersResolver {
  constructor(
    @InjectRepository(UserModel) private usersRepository: Repository<UserModel>,
  ) {}

  @Query(() => [UserModel])
  users(): Promise<UserModel[]> {
    return this.usersRepository.find();
  }

  @Query(() => UserModel)
  user(@Args('id') id: string): Promise<UserModel> {
    return this.usersRepository.findOneBy({ id });
  }

  @Mutation(() => UserModel)
  createUser(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<UserModel> {
    return this.usersRepository.save({ name, email, password });
  }

  @Mutation(() => UserModel)
  async UpdateUser(
    @Args('id') id: string,
    @Args('name', { nullable: true }) name: string,
    @Args('email', { nullable: true }) email: string,
    @Args('password', { nullable: true }) password: string,
  ): Promise<UserModel> {
    const res = await this.usersRepository.findOneBy({ id });
    return this.usersRepository.save({
      ...res,
      name,
      email,
      password,
    });
  }
}
