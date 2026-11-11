import postgres, { type PostgresClient } from "@prisma/orm-postgres/runtime";
import type { Contract } from "./prisma/contract.js";
import contractJson from "./prisma/contract.json" with { type: "json" };
import { contractFromJson } from "@prisma/orm-postgres/static";

export type { Contract };

export const contract = contractFromJson<Contract>(contractJson);

export const db: PostgresClient<Contract> = postgres({
    contract,
    url: process.env['DATABASE_URL']
})