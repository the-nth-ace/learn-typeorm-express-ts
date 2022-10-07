import express from 'express';
import {AppDataSource} from "../common/db/DataSource";
import {Client} from "../entities/Client";
import {ClientRepository} from "../repository/client.repository";

const router = express.Router()
const clientRepository = new ClientRepository()

router.get('/clients', async (req, res) => {
    const clients = await clientRepository.findManyClients()
    res.json({
        items: clients.length,
        data: clients
    })
})

router.post('/clients', async (req, res) => {
    const clientData = {...req.body}
    return res.json(await clientRepository.createClient(clientData))

})

router.get('/clients/:id', async (req, res) => {
    let {id} = req.params
    return res.json(await clientRepository.findClientById(id))
})

router.delete('/clients/:id', async (req, res) => {
    const {id} = req.params;
    return res.json(await clientRepository.deleteClient(id))
})

router.patch('/clients/:id', async (req, res) => {
    const {id} = req.params
    const updateData = req.body
    return res.json(await clientRepository.updateClient(id, updateData))

})


export {
    router as createClientRouter
}

