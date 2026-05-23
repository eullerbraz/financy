import { Field, InputType } from 'type-graphql';
import { Colors } from '../../models/category.model';

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => String)
  icon!: string;

  @Field(() => Colors)
  color!: Colors;
}

@InputType()
export class UpdateCategoryInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => String, { nullable: true })
  icon?: string;

  @Field(() => Colors, { nullable: true })
  color?: Colors;
}
