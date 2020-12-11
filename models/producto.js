const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    nombre: String,
    sku: {type: String, unique: true},
    descripcion: String,
    precio: Number,
    proveedor: String
})

module.exports = mongoose.model('Producto', ProductoSchema);