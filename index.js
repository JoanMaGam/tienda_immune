const http = require('http');
const app = require('./src/app');

//Congif .env
require('dotenv').config();

//Config BD
require('./src/config/db');

const PORT = process.env.PORT || 3000;

//Creación del server (para crearlo necesitamos la app de expres que nos permita gestionar las rutas.)
const server = http.createServer(app);

server.listen(PORT);
server.on('listening', () => console.log(`Servidor escuchando en puerto ${PORT}`));
