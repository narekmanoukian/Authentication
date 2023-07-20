require('dotenv').config()
const express = require('express')
const sequelize = require("./db")
const models = require('./models/model')
const cors = require('cors')



const PORT = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())



const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()


