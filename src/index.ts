import { AppDataSource } from "./common/db/DataSource";
import "reflect-metadata";
import express from "express";
import { createClientRouter } from "./routes/client";

const app = express();
app.use(express.json());
app.use(createClientRouter);

app.listen(8090, () => {
  AppDataSource.initialize()
    .then(() => {
      console.log("Postgres Data Source has been initialized");
    })
    .catch((err) => {
      console.log("Error during Postgres Data Source initialization ", err);
    });
  console.log("Express server listening on port 8080");
});
