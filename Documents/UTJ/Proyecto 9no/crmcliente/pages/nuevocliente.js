import React, { useState } from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";
import Swal from "sweetalert2";
import styled from "@emotion/styled";

/* Estilos */
const R = styled.div`
  text-align: right;
`;

const Error = styled.div`
  width: 100%;
  text-align: left;
  padding: 8px;
`;

const Error2 = styled.div`
  width: 100%;
  padding: 8px;
`;

const Obligatorio = styled.span`
  color: red;
  font-weight: bold;
`;
/* Fin estilos */

/* GraphQL */
const NUEVO_CLIENTE = gql`
  mutation nuevoCliente($input: ClienteInput) {
    nuevoCliente(input: $input) {
      id
      nombre
      apellido
      telefono
      direccion
      nombreNegocio
      email
    }
  }
`;

const OBTENER_CLIENTES_USUARIO = gql`
  query ObtenerClientesVendedor {
    obtenerClientesVendedor {
      id
      nombre
      apellido
      telefono
      direccion
      nombreNegocio
      email
      vendedor
    }
  }
`;

const NuevoCliente = () => {
  const router = useRouter();
  // Mensaje de alerta
  const [mensaje, guardarMensaje] = useState(null);

  //Mutation para crear nuevos clientes
  const [nuevoCliente] = useMutation(NUEVO_CLIENTE, {
    update(cache, { data: { nuevoCliente } }) {
      // Obtener el objeto de cache que deseamos actualizar
      const { obtenerClientesVendedor } = cache.readQuery({
        query: OBTENER_CLIENTES_USUARIO,
      });

      //Reescribir el cache (el cache nunca se debe de modificar)
      cache.writeQuery({
        query: OBTENER_CLIENTES_USUARIO,
        data: {
          obtenerClientesVendedor: [...obtenerClientesVendedor, nuevoCliente],
        },
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      telefono: "",
      direccion: "",
      nombreNegocio: "",
      email: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre del cliente es obligatorio"),
      apellido: Yup.string(),
      telefono: Yup.string().required("El telefono del cliente es obligatorio"),
      direccion: Yup.string().required(
        "La direccion del cliente es obligatoria"
      ),
      nombreNegocio: Yup.string().required(
        "El nombre del negocio es obligatorio"
      ),
      email: Yup.string().required("El email del cliente es obligatorio"),
    }),
    onSubmit: async (valores) => {
      const { nombre, apellido, telefono, direccion, nombreNegocio, email } =
        valores;

      try {
        const { data } = await nuevoCliente({
          variables: {
            input: {
              nombre,
              apellido,
              telefono,
              direccion,
              nombreNegocio,
              email,
            },
          },
        });
        //console.log(data.nuevoCliente);
        confirmar();
        router.push("/"); //Redireccionar a la pagina principal
      } catch (error) {
        guardarMensaje(error.message.replace("GraphQL error: ", ""));
        setTimeout(() => {
          guardarMensaje(null);
        }, 2000);
      }
    },
  });

  const mostrarMensaje = () => {
    return (
      <Error2 className="py-2 px-3 w-full my-3 max-w-sm text-center rounded mx-auto bg-red-100 border-l-4 border-r-4 border-red-500 text-red-700">
        <p>{mensaje}</p>
      </Error2>
    );
  };

  const confirmar = () => {
    Swal.fire("¿Cliente creado exitosamente!", "", "success");
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">
        Registrar nuevo cliente
      </h1>
      <br />
      <hr />
      {mensaje && mostrarMensaje()}

      <div className="mt-5">
        <div className="">
          <form
            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nombre"
              >
                <Obligatorio>*</Obligatorio> Nombre
                {formik.touched.nombre && formik.errors.nombre ? (
                  <Error className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p>
                      <span className="font-bold">Error: </span>
                      {formik.errors.nombre}
                    </p>
                  </Error>
                ) : null}
              </label>

              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nombre"
                type="text"
                placeholder="Nombre Cliente"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nombre}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="apellido"
              >
                Apellido
              </label>

              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="apellido"
                type="text"
                placeholder="Apellido Cliente"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.apellido}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="telefono"
              >
                <Obligatorio>*</Obligatorio> Teléfono
                {formik.touched.telefono && formik.errors.telefono ? (
                  <Error className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p>
                      <span className="font-bold">Error: </span>
                      {formik.errors.telefono}
                    </p>
                  </Error>
                ) : null}
              </label>

              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="telefono"
                type="tel"
                placeholder="Teléfono Cliente"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.telefono}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="direccion"
              >
                <Obligatorio>*</Obligatorio> Dirección
                {formik.touched.direccion && formik.errors.direccion ? (
                  <Error className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p>
                      <span className="font-bold">Error: </span>
                      {formik.errors.direccion}
                    </p>
                  </Error>
                ) : null}
              </label>

              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="direccion"
                type="text"
                placeholder="Dirección del negocio"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.direccion}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nombreNegocio"
              >
                <Obligatorio>*</Obligatorio> Nombre del negocio
                {formik.touched.nombreNegocio && formik.errors.nombreNegocio ? (
                  <Error className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p>
                      <span className="font-bold">Error: </span>
                      {formik.errors.nombreNegocio}
                    </p>
                  </Error>
                ) : null}
              </label>

              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nombreNegocio"
                type="text"
                placeholder="Nombre del negocio"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nombreNegocio}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                <Obligatorio>*</Obligatorio> Correo Electrónico
              </label>
              {formik.touched.email && formik.errors.email ? (
                <Error className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p>
                    <span className="font-bold">Error: </span>
                    {formik.errors.email}
                  </p>
                </Error>
              ) : null}
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Correo electrónico cliente"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>

            <R>
              <input
                type="submit"
                className="bg-green-500 mt-5 p-2 text-white rounded font-bold hover:bg-green-600"
                value="Registrar"
              />
              <Link href="/">
                <input
                  type="submit"
                  className="bg-red-600 ml-3 mt-5 p-2 text-white rounded font-bold hover:bg-red-700"
                  value="Cancelar"
                />
              </Link>
            </R>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NuevoCliente;
