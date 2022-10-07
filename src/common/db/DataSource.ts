import { DataSource } from "typeorm";
import { Client } from "../../entities/Client";
import { Banker } from "../../entities/Banker";
import { Transaction } from "../../entities/Transaction";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 49153,
  username: "postgres",
  password: "postgrespw",
  database: "learntypemig",
  entities: [Client, Banker, Transaction],
  synchronize: false,
  dropSchema: true,
  migrations: ["src/common/db/migrations/*.ts"],
});
