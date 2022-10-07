import { TestDataSource } from "../common/db/TestDataSource";
import { ClientRepository } from "./client.repository";
import { ClientService } from "../services/client.service";
import { Client } from "../entities/Client";

describe("client-service", () => {
  // the beforeAll, afterAll, beforeEach
  beforeAll(async () => {
    await TestDataSource.initialize();
    let repo = new ClientRepository();
    repo._repo = TestDataSource.getRepository(Client);
  });

  // afterAll(async () => {
  //   await TestDataSource.destroy();
  // });

  beforeEach(async () => {
    await TestDataSource.synchronize(true);
  });

  const clientData = {
    first_name: "Femi",
    last_name: "Ayo",
    email: "femi@emil.omc",
    card_number: "1234",
  };

  const clientService = new ClientService();

  it("should have a repository", async () => {
    expect(clientService).toBeDefined();
  });

  it("should return client to database when createClient is called", async () => {
    expect(await clientService.createClient(clientData)).toBeInstanceOf(Client);
  });
});
