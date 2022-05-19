const mongoose = require("mongoose");

const ClientesSchema = mongoose.Schema({
  nombre: {
    type: "string",
    required: true,
    trim: true,
  },
  apellido: {
    type: "string",
    required: true,
    trim: true,
  },
  telefono: {
    type: "string",
    trim: true,
    unique: true,
    required: true,
  },
  direccion: {
    type: "string",
    trim: true,
    required: true,
    unique: true,
  },
  nombreNegocio: {
    type: "string",
    required: true,
    trim: true,
  },
  email: {
    type: "string",
    trim: true,
    unique: true,
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
  vendedor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Usuario",
  },
});

module.exports = mongoose.model("Cliente", ClientesSchema);
