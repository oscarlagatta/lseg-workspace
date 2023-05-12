import {Field, ID, ObjectType} from '@nestjs/graphql';
import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Product} from './product';

/**
 * Represents a company.
 * @class
 */
@Entity()
@ObjectType({ description: 'Company Model' })
export class Company {
  /**
   * A unique identifier for the company.
   * @type {number}
   */
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'A unique identifier' })
  id: number;

  /**
   * The name of the company.
   * @type {string}
   */
  @Column()
  @Field(() => String)
  name: string;

  /**
   * The brand of the company.
   * @type {string}
   */
  @Column()
  @Field(() => String)
  brand: string;

  /**
   * An array of flavors associated with the company.
   * @type {string[]}
   */

  @JoinTable()
  @ManyToMany((type) => Product, (product) => product.companies, { cascade: true } /* inverse side */)
  @Field(() => [Product], {nullable: true})
  products?: Product[];
}
