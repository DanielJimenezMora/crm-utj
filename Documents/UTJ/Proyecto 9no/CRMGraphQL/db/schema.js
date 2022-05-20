const { gql } = require("apollo-server");

// Schema
const typeDefs = gql`
  type Usuario {
    id: ID
    nombre: String
    apellido: String
    email: String
    creado: String
  }

  type Token {
    token: String
  }

  type Producto {
    id: ID
    nombre: String
    presentacion: String
    existencia: Int
    existenciaDeseada: Int
    precio: Int
    tipoProducto: String
    creado: String
  }

  type Cliente {
    id: ID
    nombre: String
    apellido: String
    telefono: String
    direccion: String
    nombreNegocio: String
    email: String
    vendedor: ID
  }

  type Pedido {
    id: ID
    pedido: [PedidoGrupo]
    total: Float
    cliente: ID
    vendedor: ID
    fecha: String
    estado: EstadoPedido
  }

  type PedidoGrupo {
    id: ID
    cantidad: Int
  }

  input UsuarioInput {
    nombre: String!
    apellido: String!
    email: String!
    password: String!
  }

  input AutenticarInput {
    email: String!
    password: String!
  }

  input ProductoInput {
    nombre: String!
    presentacion: String
    existencia: Int!
    existenciaDeseada: Int!
    precio: Float!
    tipoProducto: String!
  }

  input ClienteInput {
    nombre: String!
    apellido: String!
    telefono: String!
    direccion: String!
    nombreNegocio: String
    email: String
  }

  input PedidoProductoInput {
    id: ID
    cantidad: Int
  }

  input PedidoInput {
    pedido: [PedidoProductoInput]
    total: Float!
    cliente: ID!
    estado: EstadoPedido
  }

  enum EstadoPedido {
    PENDIENTE
    COMPLETADO
    CANCELADO
  }

  type Query {
    # Usuarios
    obtenerUsuario(token: String!): Usuario

    # Productos
    obtenerProductos: [Producto]
    obtenerProducto(id: ID!): Producto

    # Clientes
    obtenerClientes: [Cliente]
    obtenerClientesVendedor: [Cliente]
    obtenerCliente(id: ID!): Cliente
  }

  type Mutation {
    # Usuarios
    nuevoUsuario(input: UsuarioInput): Usuario
    autenticarUsuario(input: AutenticarInput): Token

    # Productos
    nuevoProducto(input: ProductoInput): Producto
    actualizarProducto(id: ID!, input: ProductoInput): Producto
    eliminarProducto(id: ID!): String

    # Clientes
    nuevoCliente(input: ClienteInput): Cliente
    actualizarCliente(id: ID!, input: ClienteInput): Cliente
    eliminarCliente(id: ID!): String

    # Pedidos
    nuevoPedido(input: PedidoInput): Pedido
  }
`;

module.exports = typeDefs;
