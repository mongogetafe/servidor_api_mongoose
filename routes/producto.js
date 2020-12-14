const express = require('express');
const app = express();

const Producto = require('../models/producto');


app.get('/', (req, res) => {
    Producto.find({}).select({nombre: 1, sku: 1, _id: 0}).exec((err, productos) => {
        if (err) {
            return res.status(500).json({
                mensajeError: 'Base de datos no disponible'
            })
        }
        res.status(200).json({
            productos: productos
        })
    })
})

app.get('/:_id', (req, res) => {
    Producto.findOne({_id: req.params._id}, (err, producto) => {
        console.log(err)
        if (err) {
            // if (err.kind === 'ObjectId') {
            //     return res.status(400).json({
            //         mensajeError: 'No se encontró el registro'
            //     })
            // }
            return res.status(500).json({
                mensajeError: 'Base de datos no disponible'
            })
        }
        res.status(200).json({
            producto: producto
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

app.put('/:_id', (req, res) => {

    let productoActualizado = {};

    if(req.body.nombre) {
        productoActualizado.nombre = req.body.nombre;
    }

    if(req.body.descripcion) {
        productoActualizado.descripcion = req.body.descripcion;
    }

    if(req.body.precio) {
        productoActualizado.precio = req.body.precio;
    }

    if(req.body.proveedor) {
        productoActualizado.proveedor = req.body.proveedor;
    }

    Producto.findOneAndUpdate({_id: req.params._id},{$set: productoActualizado}, {new: true} ,(err, producto) => {
        if(err) {
            return res.status(400).json({
                mensajeError: 'Error en base de datos'
            })
        }

        res.status(200).json({
            mensaje: `El producto ${producto.nombre} fue actualizado correctamente`
        })

    })

})

app.delete('/:_id', (req, res) => {

    Producto.findByIdAndDelete(req.params._id, (err, producto) => {
        if(producto === null) {
            return res.status(400).json({
                mensajeError: 'El registro no existe'
            })
        }
        if(err) {
            return res.status(400).json({
                mensajeError: 'Error en base de datos'
            })
        }

        res.status(200).json({
            mensaje: `El producto ${producto.nombre} fue eliminado correctamente`
        })
    })
})

module.exports = app;