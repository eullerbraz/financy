import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType,
} from 'type-graphql';

export enum Colors {
  green = 'green',
  blue = 'blue',
  purple = 'purple',
  pink = 'pink',
  red = 'red',
  orange = 'orange',
  yellow = 'yellow',
}

registerEnumType(Colors, {
  name: 'Colors',
  description: 'Color for categories',
});

@ObjectType()
export class CategoryModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => String)
  icon!: string;

  @Field(() => Colors)
  color!: string;

  @Field(() => String)
  userId!: string;

  @Field(() => Number, { nullable: true })
  countTransactions?: number;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}
