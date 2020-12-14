const express = require('express');
const app = express();

const Producto = require('../models/producto');


app.get('/', (req, res) => {
    Producto.find({}).select({nombre: 1, sku: 1, _id: 0}).exec((err, productos) => {
        res.status(200).json({
            productos: productos
        })
    })
})


app.post('/', (req, res) => {

    const propertiesIn = Object.keys(req.body);
    const propertiesAllowed = ['nombre','sku','descripcion','precio','proveedor'];
    const validPost = propertiesIn.every(property => {
        propertiesAllowed.includes(property);
    })

    if (!validPost) {
        return res.status(400).json({
            mensajeError: 'Propiedades no válidas'
        })
    }

    let producto = new Producto({
        nombre: req.body.nombre,
        sku: req.body.sku,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        proveedor: req.body.proveedor
    })

    producto.save((err, productoGuardado) => {
        
        if(err) {
            let mensajeError;
            if (err.code === 11000) {
                mensajeError = 'El código sku ya existe'
            } else {
                mensajeError = 'Error en la base de datos'
            }

            return res.status(400).json({
                message: mensajeError,
                err: err
            })
        } 

        res.status(200).json({
            message: 'ok'
        })
    })

})

module.exports = app;