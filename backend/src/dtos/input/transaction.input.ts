import { Field, GraphQLISODateTime, InputType } from 'type-graphql';
import { TransactionType } from '../../models/transaction.model';

@InputType()
export class CreateTransactionInput {
  @Field(() => String)
  description!: string;

  @Field(() => GraphQLISODateTime)
  date!: Date;

  @Field(() => Number)
  amount!: number;

  @Field(() => TransactionType)
  type!: TransactionType;

  @Field(() => String)
  categoryId!: string;
}

@InputType()
export class UpdateTransactionInput {
  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  date?: Date;

  @Field(() => Number, { nullable: true })
  amount?: number;

  @Field(() => TransactionType, { nullable: true })
  type?: TransactionType;

  @Field(() => String, { nullable: true })
  categoryId?: string;
}
