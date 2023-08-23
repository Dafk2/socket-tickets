import fs from 'fs'
import path from 'path'

// Esta seria la primera opcion pero puede cambiar con el tiempo
// import data from "../db/data.json" assert { type: "json" };

/* Esta seria la segunda pero puede tener problemas de seguridad
toma un parámetro llamado path, que es la ruta del archivo JSON que se quiere cargar. Utiliza la función JSON.parse() para analizar y
convertir el contenido del archivo JSON en un objeto JavaScript. La función new URL(path, import.meta.url) se utiliza para construir 
una nueva URL a partir de la ruta del archivo path y la URL del módulo actual (import.meta.url). Esto se hace para asegurar que la
ruta sea correcta y pueda ser encontrada. */
const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));
const data = loadJSON('../db/data.json')

// resolve errors
/* El código utiliza el módulo url para importar la clase URL. Esto permite usar la clase URL para construir URLs y resolver 
rutas de manera más sencilla y segura. Luego, crea una variable llamada dirname que almacenará la ruta del directorio actual
(donde se encuentra el archivo) usando la clase URL y la propiedad pathname.*/
import { URL } from 'url'
let dirname = new URL('.', import.meta.url).pathname


class Ticket {
  constructor (number, desktop) {
    this.number = number;
    this.desktop = desktop;
  }
}

class TicketControllers {
  constructor () {
    // The present day
    this.today =  new Date().getDate()
    // peding tickets
    this.ticket = [];
    this.lastTicket = 0;
    this.last4 = [];

    this.init();
  }

  init () {
    const { lastTicket, today, ticket, lasts4 } = data
     
    if(this.today === today) {
      this.ticket = ticket;
      this.lastTicket = lastTicket;
      this.lasts4 = lasts4  
    }

    else {
      this.saveDb()
    }
  }
 
  get toJson () {
    return {
      today: this.today,
      ticket: this.ticket,  
      last4: this.last4,
      lastTicket: this.lastTicket
    }
  } 

  attendTicket (desktop) {
    if(this.ticket.length === 0) {
      return null
    } 

    const ticket = this.ticket.shift()
    ticket.desktop = desktop

    this.last4.unshift(ticket)

    if(this.last4 > 4) {
      this.last4.splice(-1, 1)
    }
    
    this.saveDb();
    return ticket;
  }

  nexTicket () {
    this.lastTicket += 1
    const ticket = new Ticket(this.lastTicket, null);
    console.log(ticket)

    this.ticket.push(ticket)
    this.saveDb();
    return `Ticket ${ticket.number}`
  } 

  saveDb () {
    const dbPath = path.join(toString(dirname), '../db/data.json');
    fs.writeFileSync(dbPath, JSON.stringify(this.toJson));  
  }
}

export default TicketControllers;
