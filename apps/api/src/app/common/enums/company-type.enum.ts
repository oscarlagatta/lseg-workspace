import { registerEnumType } from '@nestjs/graphql';

export enum CompanyType {
  BUSINESS = 'Business',
  GOVERNMENT = 'Government',
  SPORT = 'Sport',
}

registerEnumType(CompanyType, {
  name: 'CompanyType',
});
