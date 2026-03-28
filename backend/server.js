const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()


const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors:{origin: "*"}
})
const noteRoutes = require('./routes/noteRoutes')

app.use(cors())
app.use(express.json)
app.use('/notes', noteRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err))

app.set('socketio', io)
app.get('/', () =>{
    resizeBy.send("Server is running")
})

const PORT = process.env.PORT | 5000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))