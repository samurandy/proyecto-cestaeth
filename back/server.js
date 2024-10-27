const express = require("express")
const db = require('./db')
const cors = require('cors')

const app = express()
app.use(cors())

app.get("/ping", async (req, res) => {
    res.send({
        fecha: new Date().toISOString()
    })
})

app.get("/productos", async (req, res) => {
    try {
        const [results, fields] = await db.q("select * from Products", [])
        res.send(results)
    } catch (error){
        res.send({error: error.message}) // Si usamos el error sin el message, nos llega más info
    }
})

app.get("/productos/:id", async (req, res) => {
    try {
        const [results, fields] = await db.q("select * from Products where ProductID = ?", [req.params.id])
        res.send(results)
    } catch (error){
        res.send({error: error.message}) // Si usamos el error sin el message, nos llega más info
    }
})

app.listen(5555, () => {
    console.log("listening port: 5555")
})