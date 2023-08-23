const socketClient = io();

const lblNewTicket = document.getElementById('lblNewTicket');
const btnCreate = document.querySelector('.btn')

socketClient.on('connect', () => {
  console.log('Client connected')

  btnCreate.disable = false
})

socketClient.on('last-ticket', (lastTicket) => {
  console.log(lastTicket)

  lblNewTicket.innerText = `Ticket ${lastTicket}`
})

socketClient.on('disconnect', () => {
  console.log('Client connected')

  btnCreate.disable = true
})

btnCreate.addEventListener('click', () => {
  socketClient.emit('next-ticket', null, (ticket) => {
    lblNewTicket.innerText = ticket;
  })
})
