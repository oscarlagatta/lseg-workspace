import {Field, ObjectType} from "@nestjs/graphql";
import {Organization} from "../../common/interfaces/organization.interface";

@ObjectType({implements: () => Organization})
export class StockExchange implements Organization {
  name: string;
}


