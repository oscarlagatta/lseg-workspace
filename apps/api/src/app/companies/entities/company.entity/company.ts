import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class Company {
  @Field(() => Number)
  id: number;
  @Field(() => String)
  name: string;
  @Field(() => String)
  brand: string;
  @Field(() => [String])
  flavors: string[];
}
