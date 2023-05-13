import { Test, TestingModule } from '@nestjs/testing';
import { ProductsByCompanyLoader } from './products-by-company.loader';

describe('ProductsByCompanyLoader', () => {
  let provider: ProductsByCompanyLoader;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsByCompanyLoader],
    }).compile();

    provider = module.get<ProductsByCompanyLoader>(ProductsByCompanyLoader);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
