const mongoose = require("mongoose");

const ProductosSchema = mongoose.Schema({
  nombre: {
    type: "string",
    required: true,
    trim: true,
  },
  presentacion: {
    type: "string",
    required: true,
    trim: true,
  },
  existencia: {
    type: Number,
    required: true,
    trim: true,
  },
  existenciaDeseada: {
    type: Number,
    required: true,
    trim: true,
  },
  precio: {
    type: Number,
    required: true,
    trim: true,
  },
  tipoProducto: {
    type: String,
    required: true,
    trim: true,
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Producto", ProductosSchema);
