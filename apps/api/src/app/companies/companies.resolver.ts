import { ParseIntPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CompaniesService } from './companies.service';
import { CreateCompanyInput } from './dto/create-company.input';
import { UpdateCompanyInput } from './dto/update-company.input';
import { Company } from './entities/company';

/**
 * Resolver for the Companies entity.
 * @class
 */
@Resolver()
export class CompaniesResolver {
  constructor(private readonly companiesService: CompaniesService, private readonly pubSub: PubSub) {}
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

  @Query(() => Company, { name: 'company' })
  async findOne(@Args('id', { type: () => ID }, ParseIntPipe) id: number): Promise<Company> {
    return this.companiesService.findOne(id);
  }

  @Mutation(() => Company, { name: 'createCompany' })
  async create(@Args('createCompanyInput') createCompanyInput: CreateCompanyInput) {
    return this.companiesService.create(createCompanyInput);
  }

  @Mutation(() => Company, { name: 'updateCompany' })
  async update(
    @Args('id', ParseIntPipe) id: number,
    @Args('updateCompanyInput') updateCompanyInput: UpdateCompanyInput,
  ) {
    return this.companiesService.update(id, updateCompanyInput);
  }

  @Mutation(() => Company, { name: 'removeCompany' })
  async remove(@Args('id', ParseIntPipe) id: number) {
    return this.companiesService.remove(id);
  }

  @Subscription(() => Company)
  companyAdded() {
    return this.pubSub.asyncIterator('companyAdded');
  }
}
