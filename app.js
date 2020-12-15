const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config()

const app = express();

const producto = require('./routes/producto');

const port = process.env.PORT;  // Declaramos las variables en Node es VARIABLE_ENTORNO=valor
const mongoURI = process.env.MONGOURI;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}

mongoose.connect(mongoURI, options)
        .then(() => {
            console.log('Conexión ok a base de datos');
        })
        .catch((err) => {
            console.log('Error de conexión', err)
        })

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/producto', producto);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`)
})