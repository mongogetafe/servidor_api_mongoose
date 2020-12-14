const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    sku: {type: String, unique: true, required: true},
    descripcion: String,
    precio: Number,
    proveedor: String
})

module.exports = mongoose.model('Producto', ProductoSchema);