import { Module } from '@nestjs/common';
import { CompaniesResolver } from './companiesResolver';

@Module({
  providers: [ CompaniesResolver]
})
export class CompaniesModule {}
