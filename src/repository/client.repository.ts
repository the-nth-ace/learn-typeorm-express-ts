import {AppDataSource} from "../common/db/DataSource";
import {Repository} from "typeorm";
import {Client, ClientDTo} from "../entities/Client";

export class ClientRepository {
    public _repo: Repository<Client>

    constructor() {
        this._repo = AppDataSource.getRepository(Client)
    }

    async findClientById(id: string) {
        const clientId = parseInt(id)
        const client = await this._repo.findOneBy({id: clientId})
    }

    async findManyClients() {
        return await this._repo.find()
    }

    async createClient(clientData: ClientDTo) {
        try {
            const client = await this._repo.insert(clientData)
            return await this._repo.findOneBy({email: clientData.email})
        } catch (err) {
            throw new Error('Something went wrong')
        }

    }

    async deleteClient(id: string){
        const clientId = parseInt(id)
        await this._repo.delete(clientId)

    }

    async updateClient(id: string, clientUpdateData: Partial<ClientDTo>){
        const clientId = parseInt(id)
        try {
            await  this._repo.update(clientId,{...clientUpdateData} )

        } catch {
        //    raise some error
        }
    }


}