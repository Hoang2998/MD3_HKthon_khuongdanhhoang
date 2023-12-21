const express = require('express')
const route = express.Router()
const db = require('../config/database')

route.get('/todolists', async (req, res) => {
    const [data] = await db.execute('SELECT * FROM todo')
    // console.log(data)
    res.status(200).json({
        message:"success",
        data:data
    })
})
route.post('/todolists', async (req, res) => {
    const {name ,status} = req.body
    if(name){
        const [data] = await db.execute('INSERT INTO todo (name) VALUES (?)', [name])
    return res.status(201).json({
        message:"success",
        type:"success",
    })
    }
         res.status(400).json({
        message:" bạn chưa điền tên công việc ",
        type:"error",
    })
})

route.delete('/todolists/:id', async (req, res) => {
    const {id} = req.params
    const [data] = await db.execute('DELETE FROM todo WHERE id = ?', [id])
    res.status(200).json({
        message:"delete success",
    })
})
route.put('/todolists/:id', async (req, res) => {
    const {id} = req.params
    const {name} = req.body
    const [data] = await db.execute('UPDATE todo SET name = ? WHERE id = ?', [name, id])
    res.status(200).json({
        message:"update success",
        type:"success",
    })
})

route.put('/todolists/edit/:id', async (req, res) => {
    const {id} = req.params
    const {status} = req.body
    const [data] = await db.execute('UPDATE todo SET status = ? WHERE id = ?', [status, id])
    res.status(200).json({
        message:"update success",
    })
})

module.exports = route