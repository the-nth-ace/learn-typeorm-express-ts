import express from 'express';
import {AppDataSource} from "../common/db/DataSource";
import {Client} from "../entities/Client";

const router = express.Router()
const clientRepository = AppDataSource.getRepository(Client)

router.get('/clients', async (req, res) => {
    const clients = await clientRepository.find({})
    res.json({
        items: clients.length,
        data: clients

    })
})

router.post('/clients', async (req, res) => {
    const clientData = {...req.body}

    try {
        const client = await clientRepository.insert(clientData)
        res.status(201)
        res.json({
            message: 'success'
        })
    } catch (err) {
        console.log(err)
        res.status(500)
        res.json({
            message: 'something went wrong'
        })
    }

})

router.get('/clients/:id', async (req, res) => {
    let {id} = req.params
    let clientId: number = parseInt(id)
    return res.json(await clientRepository.findOneBy({id: clientId}))
})

router.delete('/clients/:id', async (req, res) => {
    const {id} = req.params;
    const clientId = parseInt(id)

    try {
        await clientRepository.delete(clientId)
        res.status(204)
        res.send()
    } catch (err) {
        console.log(err)
        res.status(500)
        res.json({
            message: 'something went wrong'
        })
    }
})

router.patch('/clients/:id', async (req, res) => {
    const {id} = req.params
    const updateData = req.body
    console.log(updateData)
    const clientId = parseInt(id);
    try {
        await  clientRepository.update(clientId,{...updateData} )
        res.status(203)
        res.send()
    } catch {
        res.status(500)
    res.send()
    }




})


export {
    router as createClientRouter
}

