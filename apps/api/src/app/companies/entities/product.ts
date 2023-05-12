import {Field, ID, ObjectType} from '@nestjs/graphql';
import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Company} from './company';

/**
 * Represents a product.
 * @class
 */
@Entity()
@ObjectType({ description: 'Product' })
export class Product {

  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field(() => String)
  name: string;

  @ManyToMany((type) => Company, (company) => company.products /*inverse side*/)
  @Field(() => [Company])
  companies: Company[];
}
