
import {Query, Resolver} from '@nestjs/graphql';
import {Company} from "./entities/company.entity/company";

@Resolver()
export class CompaniesResolver {
  @Query(() => [Company], { name: 'companies'})
  async findAll() {
    return [];
  }

}
