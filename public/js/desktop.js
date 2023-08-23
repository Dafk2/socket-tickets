const lblDesktop = document.querySelector('h1');
const btnAttended = document.querySelector('button');
const ticketAttended = document.querySelector('.text-primary');
const divAlert = document.querySelector('.alert')

// hold
const ticketPendig = document.querySelector('#lblpending')

const searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('desktop')) {
  window.location = 'index.html'

  throw new Error('The desktop is required')
}

const desktop = searchParams.get('desktop')
lblDesktop.innerText = desktop

divAlert.style.display = 'none'

const socketClient = io();

socketClient.on('connect', () => {
  console.log('Connected')

  btnAttended.disable = false;
})

socketClient.on('disconnect', () => {
  console.log('client disconnected from server');
  btnAttended.disable = true;
})

socketClient.on('tickets-pending', (tickets) => {
  if(tickets === 0) {
    ticketPendig.style.display = 'none'  
  }

  else {
    ticketPendig.style.display = 'block'
    ticketPendig.innerText = tickets;
  }
})

btnAttended.addEventListener('click', () => {
  socketClient.emit('attended-ticket', { desktop }, ({ ticket, msg, ok }) => {
    if(!ok) {
      ticketAttended.innerText = 'Nobody'
      return divAlert.style.display = 'block'
    }

    ticketAttended.innerText = `Ticket ${ticket.number}`
  })
})