import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesResolver } from './companiesResolver';

@Module({
  providers: [CompaniesResolver, CompaniesService],
})
export class CompaniesModule {}
