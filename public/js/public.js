const socket = io();

const lblTicket1 = document.getElementById('lblTicket1');
const lblTicket2 = document.getElementById('lblTicket2');
const lblTicket3 = document.getElementById('lblTicket3');
const lblTicket4 = document.getElementById('lblTicket4');

const lblDesktop1 = document.getElementById('lblDesktop1');
const lblDesktop2 = document.getElementById('lblDesktop2');
const lblDesktop3 = document.getElementById('lblDesktop3');
const lblDesktop4 = document.getElementById('lblDesktop4');

socket.on('connect', () => {
  console.log('New user connect')
})

socket.on('disconnect', () => {
  console.log('User connect')
})

socket.on('status-last4', (payload) => {
  const [ ticket1, ticket2, ticket3, ticket4 ] = payload
   
  const audio = new Audio('../audio/new-ticket.mp3')
  audio.play()

  if(ticket1) {
    lblTicket1.innerText = `Ticket ${ticket1.number}`
    lblDesktop1.innerText = ticket1.desktop
  } else {
    lblDesktop1.innerText = 'Desktop null'
  }
  
  if(ticket2) {
    lblTicket2.innerText = `Ticket ${ticket2.number}`
    lblDesktop2.innerText = ticket2.desktop
  } else {
    lblDesktop2.innerText = 'Desktop null'
  }

  if(ticket3) {
    lblTicket3.innerText = `Ticket ${ticket3.number}`
    lblDesktop3.innerText = ticket3.desktop
  } else {
    lblDesktop3.innerText = 'Desktop null'
  }

  if(ticket4) {
    lblTicket4.innerText = `Ticket ${ticket4.number}`
    lblDesktop4.innerText = ticket4.desktop
  } else {
    lblDesktop4.innerText = 'Desktop null'
  }
})