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
  CreateTransactionInput,
  UpdateTransactionInput,
} from '../dtos/input/transaction.input';
import { GqlUser } from '../graphql/decorators/user.decorator';
import { IsAuthenticated } from '../middlewares/auth.middleware';
import { CategoryModel } from '../models/category.model';
import {
  TransactionModel,
  TransactionsManyModel,
} from '../models/transaction.model';
import { UserModel } from '../models/user.model';
import { CategoriesService } from '../services/categories.service';
import { TransactionsService } from '../services/transactions.service';
import { UsersService } from '../services/users.service';

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuthenticated)
export class TransactionResolver {
  private transactionService = new TransactionsService();
  private userService = new UsersService();
  private categoryService = new CategoriesService();

  @Mutation(() => TransactionModel)
  async createTransaction(
    @Arg('data', () => CreateTransactionInput) data: CreateTransactionInput,
    @GqlUser() user: UserModel,
  ): Promise<TransactionModel> {
    return this.transactionService.createTransaction(data, user.id);
  }

  @Mutation(() => TransactionModel)
  async updateTransactionById(
    @Arg('data', () => UpdateTransactionInput) data: UpdateTransactionInput,
    @Arg('id', () => String) id: string,
  ): Promise<TransactionModel> {
    return this.transactionService.updateTransactionById(id, data);
  }

  @Mutation(() => Boolean)
  async deleteTransactionById(
    @Arg('id', () => String) id: string,
  ): Promise<boolean> {
    await this.transactionService.deleteTransactionById(id);

    return true;
  }

  @Query(() => [TransactionModel])
  async getAllTransactionsByUserId(
    @GqlUser() user: UserModel,
  ): Promise<TransactionModel[]> {
    return this.transactionService.getAllTransactionsByUserId(user.id);
  }

  @Query(() => [TransactionModel])
  async getAllTransactionsByCategoryId(
    @Arg('categoryId', () => String) categoryId: string,
  ): Promise<TransactionModel[]> {
    return this.transactionService.getAllTransactionsByCategoryId(categoryId);
  }

  @Query(() => TransactionsManyModel)
  async getRecentTransactionsByUserId(
    @GqlUser() user: UserModel,
  ): Promise<TransactionsManyModel> {
    const [transactions, totalInflow, totalOutflow] = await Promise.all([
      this.transactionService.getRecentTransactionsByUserId(user.id),
      this.transactionService.getAllInflowsAmountByUserId(user.id),
      this.transactionService.getAllOutflowsAmountByUserId(user.id),
    ]);

    return {
      transactions,
      totalInflow,
      totalOutflow,
      balance: totalInflow - totalOutflow,
    };
  }

  @Query(() => TransactionModel)
  async getTransactionById(
    @Arg('id', () => String) id: string,
  ): Promise<TransactionModel> {
    return this.transactionService.getTransactionById(id);
  }

  @FieldResolver(() => UserModel)
  async user(@Root() transaction: TransactionModel): Promise<UserModel> {
    return this.userService.getUserById(transaction.userId);
  }

  @FieldResolver(() => CategoryModel)
  async category(
    @Root() transaction: TransactionModel,
  ): Promise<CategoryModel> {
    return this.categoryService.getCategoryById(transaction.categoryId);
  }
}
