const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

// Resolvers
const resolvers = {
  Query: {
    obtenerCursos: () => "Hola mundo",
  },
  Mutation: {
    nuevoUsuario: async (_, { input }) => {
      const { email, password } = input;

      // Revisar si el usuario ya está registrado
      const existeUsuario = await Usuario.findOne({ email });
      console.log(existeUsuario);
      if (existeUsuario) {
        throw new Error("El usuario ya está registrado");
      }

      // Hashear el password
      const salt = await bcryptjs.genSalt(10);
      input.password = await bcryptjs.hash(password, salt);

      try {
        // Guardar el usuario en la base de datos
        const usuario = new Usuario(input);
        usuario.save(); //Guardar el usuario en la base de datos
        return usuario;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = resolvers;
