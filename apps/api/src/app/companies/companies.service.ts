import { Injectable } from '@nestjs/common';
import { CreateCompanyInput } from './dto/create-company.input';

@Injectable()
export class CompaniesService {
  async findAll() {
    return [];
  }

  async findOne(id: number) {
    return null;
  }

  async create(createCompanyInput: CreateCompanyInput) {
    return null;
  }
}
