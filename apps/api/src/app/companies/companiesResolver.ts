import { Query, Resolver } from '@nestjs/graphql';
import { Company } from "./entities/company.entity/company";

/**
 * Resolver for the Companies entity.
 * @class
 */
@Resolver()
export class CompaniesResolver {
  /**
   * Retrieves all companies.
   * @returns {Promise<Company[]>} An array of companies.
   * This method returns an empty array, but its type signature indicates that it should return
   * a Promise of an array of Company objects.
   * The @Query() decorator defines this method as a GraphQL query with the name companies
   * that returns an array of Company objects.
   */
  @Query(() => [Company], { name: 'companies' })
  async findAll(): Promise<Company[]> {
    return [];
  }
}
