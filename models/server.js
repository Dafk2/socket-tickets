import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

// controllers
// Recuerda poner las extenciones del archivo (.js)
import socketControllers from '../socket/socket_controllers.js'

class ServerApp {
  constructor () {
    this.port = process.env.PORT
    this.app = express() 
    this.server = http.createServer(this.app)
    this.io = new Server(this.server)

    // middleware
    this.middleware()

    // socket events
    this.socketEvents();
  }
  
  middleware () {
    this.app.use(express.static('public'))
    this.app.use(cors())
  }
  
  socketEvents () {
    this.io.on('connection', socketControllers)
  }

  listen () {
    this.server.listen(this.port, () => {
      console.log(`server on port ${this.port}`)
    })
  }
}

export default ServerApp