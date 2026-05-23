import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType,
} from 'type-graphql';

export enum TransactionType {
  inflow = 'inflow',
  outflow = 'outflow',
}

registerEnumType(TransactionType, {
  name: 'TransactionType',
  description: 'Type for transactions',
});

@ObjectType()
export class TransactionModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  description!: string;

  @Field(() => GraphQLISODateTime)
  date!: Date;

  @Field(() => Number)
  amount!: number;

  @Field(() => String)
  type!: string;

  @Field(() => String)
  categoryId!: string;

  @Field(() => String)
  userId!: string;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}
