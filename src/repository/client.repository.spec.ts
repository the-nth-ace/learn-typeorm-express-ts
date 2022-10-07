import { ClientRepository } from "./client.repository";
import { TestDataSource } from "../common/db/TestDataSource";
import { Client } from "../entities/Client";

beforeAll(async () => {
  await TestDataSource.initialize();
  let repo = new ClientRepository();
  repo._repo = TestDataSource.getRepository(Client);
});

afterAll(async () => {
  await TestDataSource.destroy();
});

beforeEach(async () => {
  await TestDataSource.synchronize(true);
});
describe("client-repository", () => {
  //  the beforeAll, afterAll, beforeEach

  let repo = new ClientRepository();
  repo._repo = TestDataSource.getRepository(Client);
  const clientData = {
    first_name: "Femi",
    last_name: "Ayo",
    email: "femi@emil.omc",
    card_number: "1234",
  };

  it("should have a database connection", () => {
    expect(repo._repo).toBeDefined();
  });

  it("should have an empty client table", async () => {
    let clients: any = await repo.findManyClients();
    expect(clients).toEqual([]);
  });

  it("should call the insert method on the database when invoking the createClient method", async () => {
    const spy = jest.spyOn(repo._repo, "insert");
    await repo.createClient(clientData);
    expect(spy).toHaveBeenCalled();
  });

  it("createClient method should return a new client", async () => {
    expect(await repo.createClient(clientData)).toBeInstanceOf(Client);
  });

  it("returns clients when findManyClients is called", async () => {
    await repo.createClient(clientData);
    clientData.email = "femiayotubosun@gmail.com";
    clientData.card_number = "12223";
    await repo.createClient(clientData);
    expect((await repo.findManyClients()).length).toEqual(2);
  });

  it("returns one client when findClientById is called with id", async () => {
    const client = await repo.createClient(clientData);
    if (client) {
      const retClient = await repo.findClientById(client.id);
      expect(client).toEqual(retClient);
    }
  });

  it("should delete client when deleteClient is called with id", async () => {
    const client = await repo.createClient(clientData);
    if (client) {
      const lengths = (await repo.findManyClients()).length;
      await repo.deleteClient(client.id);
      expect((await repo.findManyClients()).length).toEqual(lengths - 1);
    }
  });
});
