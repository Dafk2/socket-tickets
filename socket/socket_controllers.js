import TicketControllers from '../models/ticket_control.js';

const ticketControllers = new TicketControllers();

const socketControllers = (socket) => {
  console.log('new connection in server')

  // last
  socket.emit('last-ticket', ticketControllers.lastTicket)

  // last 4
  socket.emit('status-last4', ticketControllers.last4)

  // tickets peding
  socket.emit('tickets-pending', ticketControllers.ticket.length)

  socket.on('next-ticket', (payload, callback) => {
    const nexTicket = ticketControllers.nexTicket()
    callback(nexTicket) 

    socket.broadcast.emit('tickets-pending', ticketControllers.ticket.length)
  })

  socket.on('attended-ticket', ({desktop}, callback) => {
    if(!desktop) {
      return callback({ msg: 'The desktop is required' })
    } 

    const ticket = ticketControllers.attendTicket(desktop);

    socket.broadcast.emit('status-last4', ticketControllers.last4)
    
    socket.emit('tickets-pending', ticketControllers.ticket.length)
    socket.broadcast.emit('tickets-pending', ticketControllers.ticket.length)

    if(!ticket) {
      return callback({
        ok: false,
        msg: "No peding tickets"
      })
    }
  
    if(ticket) {
      return callback({
        ok: true,
        ticket
      })
    }
  })
}

export default socketControllers
