const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

require('dotenv').config();

// Se crea la constate para la app principal
const app = express();

// Parse requests of content-type - application/json
app.use(bodyParser.json());
// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Configuración para las vistas
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de las rutas
app.use('/', require('./routes/index.routes'));

// Se define el puerto por donde el server escuchará las peticiones
const PORT = process.env.PORT || 8001;
// Inicia el servidor
app.listen(PORT, () => console.log(`El server está corriendo en el puerto: ${PORT}.`));
