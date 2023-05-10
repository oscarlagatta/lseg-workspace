import { Field, ID, ObjectType } from "@nestjs/graphql";

/**
 * Represents a company.
 * @class
 */
@ObjectType({ description: 'Company Model' })
export class Company {
  /**
   * A unique identifier for the company.
   * @type {number}
   */
  @Field(() => ID, { description: 'A unique identifier' })
  id: number;

  /**
   * The name of the company.
   * @type {string}
   */
  @Field(() => String)
  name: string;

  /**
   * The brand of the company.
   * @type {string}
   */
  @Field(() => String)
  brand: string;

  /**
   * An array of flavors associated with the company.
   * @type {string[]}
   */
  @Field(() => [String])
  flavors: string[];
}
