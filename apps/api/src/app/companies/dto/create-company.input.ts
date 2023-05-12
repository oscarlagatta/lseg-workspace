import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateCompanyInput {
  @MinLength(3)
  @Field(() => String, { description: 'A new Company name' })
  name: string;
  @Field(() => String)
  brand: string;
  @Field(() => [String])
  products: string[];
}
