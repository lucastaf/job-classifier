import postgres from "@prisma/orm-postgres/runtime";
import type { Contract } from "./prisma/contract"
import contractJson from "./prisma/contract.json" with {type: 'json'}
import { contractFromJson } from "@prisma/orm-postgres/static";

export const contract = contractFromJson<Contract>(contractJson);

export const db = postgres<Contract>({
    contract,
    url: process.env['DATABASE_URL']
})