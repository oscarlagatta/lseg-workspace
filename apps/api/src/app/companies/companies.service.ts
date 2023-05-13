import { UserInputError } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {PubSub} from "graphql-subscriptions";
import { Repository } from 'typeorm';
import { CreateCompanyInput } from './dto/create-company.input';
import { UpdateCompanyInput } from './dto/update-company.input';
import { Company } from './entities/company';
import { Product } from './entities/product';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companiesRepository: Repository<Company>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly pubSub: PubSub,
  ) {}

  async findAll() {
    return this.companiesRepository.find();
  }

  async findOne(id: number) {
    const company = this.companiesRepository.findOne({ where: { id } });
    if (!company) {
      throw new UserInputError(`Company ${id} does not exist`);
    }
    return company;
  }

  async create(createCompanyInput: CreateCompanyInput) {
    const products = await Promise.all(createCompanyInput.products.map((name) => this.preloadProductByName(name)));
    const coffee = this.companiesRepository.create({
      ...createCompanyInput,
      products,
    });

    const newCompanyEntity = this.companiesRepository.save(coffee);

    // not awaiting as we want it to be asynchronous
    this.pubSub.publish('companyAdded', { companyAdded: newCompanyEntity});

    return newCompanyEntity
  }

  async update(id: number, updateCompanyInput: UpdateCompanyInput) {
    const products =
      updateCompanyInput.products &&
      (await Promise.all(updateCompanyInput.products.map((name) => this.preloadProductByName(name))));
    const company = await this.companiesRepository.preload({
      id,
      ...updateCompanyInput,
      products,
    });
    if (!company) {
      throw new UserInputError(`Company #${id} does not exist`);
    }
    return this.companiesRepository.save(company);
  }

  async remove(id: number) {
    const company = await this.findOne(id);
    return this.companiesRepository.remove(company);
  }

  private async preloadProductByName(name: string): Promise<Product> {
    const existingProduct = await this.productsRepository.findOne({ where: { name } });
    if (existingProduct) {
      return existingProduct;
    }
    return this.productsRepository.create({ name });
  }
}
