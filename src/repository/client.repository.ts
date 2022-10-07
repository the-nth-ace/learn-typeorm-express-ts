import { AppDataSource } from "../common/db/DataSource";
import { Repository } from "typeorm";
import { Client, ClientDTo } from "../entities/Client";

export class ClientRepository {
  public _repo: Repository<Client>;

  constructor() {
    this._repo = AppDataSource.getRepository(Client);
  }

  async findClientById(id: number) {
    return await this._repo.findOneBy({ id });
  }

  async findManyClients() {
    return await this._repo.find();
  }

  async createClient(clientData: ClientDTo) {
    try {
      const client = await this._repo.insert(clientData);
      return await this._repo.findOneBy({ email: clientData.email });
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong");
    }
  }

  async deleteClient(id: number) {
    await this._repo.delete(id);
  }

  async updateClient(id: number, clientUpdateData: Partial<ClientDTo>) {
    try {
      await this._repo.update(id, { ...clientUpdateData });
    } catch {
      //    raise some error
    }
  }
}
