## "A GraphQL API with NestJS: A Template to Get You Started"

<div style="display: flex; align-items: center; justify-content: center;">
  <a href="https://nestjs.org" target="_blank" rel="noreferrer"><img src="https://nestjs.com/img/logo_text.svg" width="100" alt="Nestjs"></a>
  <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/remojansen/logo.ts/master/ts.png" width="100" alt="TypeScript"></a>
  <a href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="100" alt="Nx logo"></a>
</div>

## Queries

```graphql
{
  companies {
    id
    name
    brand
    products
  }
}
```

## Query by ID

```graphql
{
  company(id: 2) {
    id
    name
    brand
  }
}
```

## Mutations

```graphql
mutation {
  createCompany(
    createCompanyInput: { name: "Marks & Spencer", brand: "Ecommerce", products: ["consultancy", "development"] }
  ) {
    id
    name
    brand
    products
  }
}

mutation {
  updateCompany(id: 3, updateCompanyInput: { name: "Updated" }) {
    name
  }
}

mutation {
  removeCompany(id: 2) {
    name
  }
}

mutation {
  createCompany(
    createCompanyInput: { name: "Marks & Spencer", brand: "Ecommerce", products: ["consultancy", "development"] }
  ) {
    id
    name
    brand
    products {
      id
      name
    }
  }
}
```

## Interfaces

```graphql
{
  stocks {
    name
    ... on Company {
      brand
    }
  }
}
```

## Unions

We need to use inline fragments to be able to query any fields.

```graphql
{
  stocks {
    ... on StockExchange {
      name
    }
    ... on Company {
      name
      brand
    }
  }
}
```

## Enum Types

```typescript
export enum CompanyType {
  BUSINESS = 'Business',
  GOVERNMENT = 'Government',
  SPORT = 'Sport',
}

registerEnumType(CompanyType, {
  name: 'CompanyType',
});
```

```graphql
mutation {
  createCompany(
    createCompanyInput: {
      name: "Microsoft Corporation"
      brand: "Ecommerce"
      products: ["consultancy", "development"]
      type: BUSINESS
    }
  ) {
    id
    name
    brand
    products {
      id
      name
    }
  }
}
```

### Querying the Enum Types

```graphql
{
  __type(name: "CompanyType") {
    enumValues {
      name
    }
  }
}
```

## Field Middleware

A field middleware can be used to:

- Convert the result of a field
- Validate the arguments of a field
- Check field-level roles

When multiple middleware functions are used, they are called sequentially (one after another) following the chain where the previous middleware decides to call the next one.

**Note:** The order in which we have our middleware functions in a middleware array is very important.

The first resolver is the "most-outer" layer, so it gets executed first and last (similarly to how you may have seen it achieved

## Real Time Updates

In addition to fetching data with queries and modifying data with mutations, the GraphQL spec supports a third operation type (that we’ve only hinted at so far), called subscriptions.

GraphQL subscriptions are a way to push data from the server to the clients that want to listen to real time messages from the server.

Subscriptions are similar to queries in that they specify a set of fields to be delivered to the client, but instead of immediately returning a single answer, a channel is opened and a result is sent to the client every time a particular event happens on the server.

A common use case for subscriptions is notifying the client side about particular events, for example the creation of a new object, when fields are updated, and many other situations…

We can run this subscription on the GraphQL Playground as Insomnia has not yet allow to run subscriptions.

Open the browser at `http://localhost:3000/graphql` and run the following:

```graphql
subscription {
  companyAdded {
    id
    name
    brand
  }
}
```

Then we run the add company mutation to check what's happening with the subscription, as follows:

```graphql
mutation {
  createCompany(
    createCompanyInput: {
      name: "Apple Inc"
      brand: "Electronics"
      products: ["iPhone", "iPad", "Macbook"]
      type: BUSINESS
    }
  ) {
    id
    name
    brand
    products {
      id
      name
    }
  }
}
```

This should trigger a subscription result that shows the details of the company we just created.

## The N+1 Problem

Sure! Here's the formatted text with some nice colors:

```sql
SELECT "product"."id" AS "product_id", "product"."name" AS "product_name" 
FROM "product" "product" 
INNER JOIN "company_products_product" "companies_product" 
ON "companies_product"."productId"="product"."id" 
INNER JOIN "company" "companies" 
ON "companies"."id"="companies_product"."companyId" 
AND ("companies"."id" = $1) -- PARAMETERS: [1]

SELECT "product"."id" AS "product_id", "product"."name" AS "product_name" 
FROM "product" "product" 
INNER JOIN "company_products_product" "companies_product" 
ON "companies_product"."productId"="product"."id" 
INNER JOIN "company" "companies" 
ON "companies"."id"="companies_product"."companyId" 
AND ("companies"."id" = $3) -- PARAMETERS: [3]

SELECT "product"."id" AS "product_id", "product"."name" AS "product_name" 
FROM "product" "product" 
INNER JOIN "company_products_product" "companies_product" 
ON "companies_product"."productId"="product"."id" 
INNER JOIN "company" "companies" 
ON "companies"."id"="companies_product"."companyId" 
AND ("companies"."id" = $4) -- PARAMETERS: [4]

SELECT "product"."id" AS "product_id", "product"."name" AS "product_name" 
FROM "product" "product" 
INNER JOIN "company_products_product" "companies_product" 
ON "companies_product"."productId"="product"."id" 
INNER JOIN "company" "companies" 
ON "companies"."id"="companies_product"."companyId" 
AND ("companies"."id" = $2) -- PARAMETERS: [2]
``` 

I've used `sql` as the language for syntax highlighting to make it easier to read the SQL queries.


After applying the Data Loader; it's just one single query

Certainly! Here's the formatted query with some colors:

```sql
SELECT "Company"."id" AS "Company_id",
       "Company__Company_products"."id" AS "Company__Company_products_id",
       "Company__Company_products"."name" AS "Company__Company_products_name"
FROM "company" "Company"
LEFT JOIN "company_products_product" "Company_Company__Company_products"
       ON "Company_Company__Company_products"."companyId"="Company"."id"
LEFT JOIN "product" "Company__Company_products"
       ON "Company__Company_products"."id"="Company_Company__Company_products"."productId"
WHERE ("Company"."id" IN ($1, $2, $3, $4)) -- PARAMETERS: [2,3,4,1]
```

I've used `sql` as the language identifier in the markdown code block, which will help render the colors appropriately.

## Conclusion

In this markdown file, we have seen how to use GraphQL to build APIs using Lseg.

We have seen how to run a development server, understand the workspace, use remote caching, and how to get help from the Nx Documentation.

We have also seen how to query, create, update, and remove companies using mutations, and how to query using GraphQL interfaces, unions, and enum types.

Finally, we have learned about field middleware and how to implement real-time updates using subscriptions._

