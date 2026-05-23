import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { UpdateUserInput } from '../dtos/input/user.input';
import { GqlUser } from '../graphql/decorators/user.decorator';
import { IsAuthenticated } from '../middlewares/auth.middleware';
import { UserModel } from '../models/user.model';
import { UsersService } from '../services/users.service';

@Resolver(() => UserModel)
@UseMiddleware(IsAuthenticated)
export class UserResolver {
  private usersService = new UsersService();

  @Mutation(() => UserModel)
  async updateUserById(
    @Arg('data', () => UpdateUserInput) data: UpdateUserInput,
    @GqlUser() user: UserModel,
  ): Promise<UserModel> {
    return this.usersService.updateUserById(user.id, data);
  }
}
