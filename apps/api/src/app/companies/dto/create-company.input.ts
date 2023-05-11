import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCompanyInput {
  @Field(() => String, { description: 'A new Company name' })
  name: string;
  @Field(() => String)
  brand: string;
  @Field(() => [String])
  flavors: string[];
}
