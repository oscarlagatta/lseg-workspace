import { Field, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class Organization {
  @Field()
  name: string;
}
