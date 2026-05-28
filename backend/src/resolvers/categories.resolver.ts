import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from '../dtos/input/category.input';
import { GqlUser } from '../graphql/decorators/user.decorator';
import { IsAuthenticated } from '../middlewares/auth.middleware';
import { CategoryModel } from '../models/category.model';
import { TransactionModel } from '../models/transaction.model';
import { UserModel } from '../models/user.model';
import { CategoriesService } from '../services/categories.service';
import { TransactionsService } from '../services/transactions.service';
import { UsersService } from '../services/users.service';

@Resolver(() => CategoryModel)
@UseMiddleware(IsAuthenticated)
export class CategoryResolver {
  private categoryService = new CategoriesService();
  private userService = new UsersService();
  private transactionService = new TransactionsService();

  @Mutation(() => CategoryModel)
  async createCategory(
    @Arg('data', () => CreateCategoryInput) data: CreateCategoryInput,
    @GqlUser() user: UserModel,
  ): Promise<CategoryModel> {
    return this.categoryService.createCategory(data, user.id);
  }

  @Mutation(() => CategoryModel)
  async updateCategoryById(
    @Arg('data', () => UpdateCategoryInput) data: UpdateCategoryInput,
    @Arg('id', () => String) id: string,
  ): Promise<CategoryModel> {
    return this.categoryService.updateCategoryById(id, data);
  }

  @Mutation(() => Boolean)
  async deleteCategoryById(
    @Arg('id', () => String) id: string,
  ): Promise<boolean> {
    await this.categoryService.deleteCategoryById(id);

    return true;
  }

  @Query(() => [CategoryModel])
  async getAllCategoriesByUserId(
    @GqlUser() user: UserModel,
  ): Promise<CategoryModel[]> {
    return this.categoryService.getAllCategoriesByUserId(user.id);
  }

  @Query(() => CategoryModel)
  async getCategoryById(
    @Arg('id', () => String) id: string,
  ): Promise<CategoryModel> {
    return this.categoryService.getCategoryById(id);
  }

  @FieldResolver(() => UserModel)
  async user(@Root() category: CategoryModel): Promise<UserModel> {
    return this.userService.getUserById(category.userId);
  }

  @FieldResolver(() => [TransactionModel])
  async transactions(
    @Root() category: CategoryModel,
  ): Promise<TransactionModel[]> {
    return this.transactionService.getAllTransactionsByCategoryId(category.id);
  }

  @FieldResolver(() => Number)
  async countTransactions(@Root() category: CategoryModel): Promise<number> {
    return this.transactionService.countTransactionsByCategoryId(category.id);
  }

  @FieldResolver(() => Number)
  async transactionsAmount(@Root() category: CategoryModel): Promise<number> {
    return this.transactionService.transactionsAmountByCategoryId(category.id);
  }
}
