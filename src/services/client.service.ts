import { ClientRepository } from "../repository/client.repository";
import { ClientDTo } from "../entities/Client";

export class ClientService {
  public _clientRepo: ClientRepository;

  constructor() {
    this._clientRepo = new ClientRepository();
  }

  async createClient(clientData: ClientDTo) {
    return await this._clientRepo.createClient(clientData);
  }
}
