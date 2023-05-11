import { ParseIntPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CompaniesService } from './companies.service';
import { CreateCompanyInput } from './dto/create-company.input';
import { Company } from './entities/company.entity/company';

/**
 * Resolver for the Companies entity.
 * @class
 */
@Resolver()
export class CompaniesResolver {
  constructor(private readonly companiesService: CompaniesService) {}
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
    return this.companiesService.findAll();
  }

  @Query(() => Company, { name: 'company', nullable: true })
  async findOne(@Args('id', { type: () => ID }, ParseIntPipe) id: number): Promise<Company> {
    return this.companiesService.findOne(id);
  }

  @Mutation(() => Company, { name: 'createCompany', nullable: true })
  async create(@Args('createCompanyInput') createCompanyInput: CreateCompanyInput) {
    return this.companiesService.create(createCompanyInput);
  }
}
