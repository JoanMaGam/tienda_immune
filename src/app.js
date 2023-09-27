const express = require('express');

const app = express(); //aqui creamos la applicacion de express.


//Config app express
app.use(express.json());

//RUTAS
app.get('/', (req, res) => res.send('Hola amigo mio!!!'))
app.use('/api', require('./routes/api'));






module.exports = app;