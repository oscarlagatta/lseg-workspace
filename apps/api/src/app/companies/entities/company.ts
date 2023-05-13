import { Field, ID, ObjectType } from '@nestjs/graphql';
import {Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {CompanyType} from "../../common/enums/company-type.enum";
import {Organization} from "../../common/interfaces/organization.interface";
import {loggerMiddleware} from "../../common/middleware/logger.middleware";
import { Product } from './product';

/**
 * Represents a company.
 * @class
 */
@Entity()
@ObjectType({ description: 'Company Model', implements: () => Organization })
export class Company implements Organization {
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

  @Field(() => String, {middleware: [loggerMiddleware]})
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
  @Field(() => [Product], { nullable: true })
  products?: Product[];

  @CreateDateColumn()
  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Column({nullable: true})
  @Field(() => CompanyType)
  type?: CompanyType

}
