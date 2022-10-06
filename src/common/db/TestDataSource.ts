import {DataSource} from "typeorm";
import {Client} from "../../entities/Client";
import {Banker} from "../../entities/Banker";
import {Transaction} from "../../entities/Transaction";

export const TestDataSource = new DataSource({
    type: "postgres",
    host: 'localhost',
    port: 49154,
    username: 'postgres',
    password: 'postgrespw',
    database: 'learntypemigtest',
    entities: [Client, Banker, Transaction],
    synchronize: false,
    migrations: ["src/common/db/migrations/*.ts"]
})