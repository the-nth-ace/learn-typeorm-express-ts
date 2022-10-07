import { DataSource } from "typeorm";
import { Client } from "../../entities/Client";
import { Banker } from "../../entities/Banker";
import { Transaction } from "../../entities/Transaction";

export const TestDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 49153,
  username: "postgres",
  password: "postgrespw",
  database: "learntypemigtest",
  entities: [Client, Banker, Transaction],
  dropSchema: true,
  synchronize: true,
  migrations: ["src/common/db/migrations/*.ts"],
});
