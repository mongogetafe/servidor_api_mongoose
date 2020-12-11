const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const producto = require('./routes/producto');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}

mongoose.connect('mongodb://localhost:27017/erp', options)
        .then(() => {
            console.log('Conexión ok a base de datos');
        })
        .catch((err) => {
            console.log('Error de conexión', err)
        })

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/producto', producto);

app.listen(8080, () => {
    console.log(`Servidor escuchando en http://localhost:8080`)
})