import React from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { gql, useMutation } from "@apollo/client";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import Swal from "sweetalert2";
import styled from "@emotion/styled";

/* Mutation */
const NUEVO_PRODUCTO = gql`
  mutation NuevoProducto($input: ProductoInput) {
    nuevoProducto(input: $input) {
      id
      nombre
      presentacion
      existencia
      existenciaDeseada
      precio
      tipoProducto
    }
  }
`;

/* Query */
const OBTENER_PRODUCTOS = gql`
  query obtenerProductos {
    obtenerProductos {
      id
      nombre
      presentacion
      existencia
      existenciaDeseada
      precio
      tipoProducto
    }
  }
`;

/* estilos */
const R = styled.div`
  text-align: right;
`;

const Error = styled.div`
  width: 100%;
  text-align: left;
  padding: 8px;
`;

const Obligatorio = styled.span`
  color: red;
  font-weight: bold;
`;

const Select = styled.select`
  width: 100%;
  height: 2rem;
  background-color: #fff;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  font-weight: 300;
  letter-spacing: 1px;
  box-sizing: border-box;
`;

/* Fin estilos */

const NuevoProducto = () => {
  // Routing
  const router = useRouter();

  // Mutation de apollos
  const [nuevoProducto] = useMutation(NUEVO_PRODUCTO, {
    update(cache, { data: { nuevoProducto } }) {
      // Obteber el objeto del cache
      const { obtenerProductos } = cache.readQuery({
        query: OBTENER_PRODUCTOS,
      });

      // Reescribir el objeto
      cache.writeQuery({
        query: OBTENER_PRODUCTOS,
        data: {
          obtenerProductos: [...obtenerProductos, nuevoProducto],
        },
      });
    },
  });

  // Formulario para nuevos productos
  const formik = useFormik({
    initialValues: {
      nombre: "",
      presentacion: "",
      existencia: "",
      existenciaDeseada: "",
      precio: "",
      tipoProducto: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre es obligatorio"),
      presentacion: Yup.string(),
      existencia: Yup.number()
        .required("Es necesario agregar la cantidad disponible")
        .positive("No puedes agregar números negativos a la existencia")
        .integer("La existencia debe de ser en números enteros"),
      existenciaDeseada: Yup.number()
        .required("La existencia deseada es obligatoria")
        .positive("No puedes agregar números negativos a la existencia deseada")
        .integer("La existencia debe de ser en números enteros"),
      precio: Yup.number()
        .required("El precio es obligatorio")
        .positive("No se aceptan números negativos"),
      tipoProducto: Yup.string().required("El tipo de producto es obligatorio"),
    }),
    onSubmit: async (valores) => {
      const {
        nombre,
        presentacion,
        existencia,
        existenciaDeseada,
        precio,
        tipoProducto,
      } = valores;

      try {
        const { data } = await nuevoProducto({
          variables: {
            input: {
              nombre,
              presentacion,
              existencia,
              existenciaDeseada,
              precio,
              tipoProducto,
            },
          },
        });
        // console.log(data);

        // Mostrar una alerta productos
        Swal.fire(
          "Producto creado",
          "El producto se creó correctamente",
          "success"
        );

        // Redireccionar hacia los productos
        router.push("/productos");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">
        Crear Nuevo Producto
      </h1>
      <br />
      <hr />

      <div className="mt-5">
        <div className="">
          <form
            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
            {/* Nombre */}
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
                placeholder="Nombre del producto"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nombre}
              />
            </div>
            {/* Fin Nombre */}

            {/* Presentación */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="presentacion"
              >
                Presentación
                {formik.touched.presentacion && formik.errors.presentacion ? (
                  <Error className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p>
                      <span className="font-bold">Error: </span>
                      {formik.errors.presentacion}
                    </p>
                  </Error>
                ) : null}
              </label>

              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="presentacion"
                type="text"
                placeholder="Ej. c/10 500 gr"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.presentacion}
              />
            </div>
            {/* Fin Presentación */}

            {/* Existencia */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="existencia"
              >
                <Obligatorio>*</Obligatorio> Existencia
                {formik.touched.existencia && formik.errors.existencia ? (
                  <Error className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p>
                      <span className="font-bold">Error: </span>
                      {formik.errors.existencia}
                    </p>
                  </Error>
                ) : null}
              </label>

              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="existencia"
                type="number"
                placeholder="Cantidad disponible actual del producto"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.existencia}
              />
            </div>
            {/* Fin de Existencia */}

            {/* Existencia Deseada */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="existenciaDeseada"
              >
                <Obligatorio>*</Obligatorio> Existencia deseada
                {formik.touched.existenciaDeseada &&
                formik.errors.existenciaDeseada ? (
                  <Error className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p>
                      <span className="font-bold">Error: </span>
                      {formik.errors.existenciaDeseada}
                    </p>
                  </Error>
                ) : null}
              </label>

              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="existenciaDeseada"
                type="number"
                placeholder="Cantidad deseada de existencia del producto"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.existenciaDeseada}
              />
            </div>
            {/* Fin de Existencia Deseada */}

            {/* Precio */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="precio"
              >
                <Obligatorio>*</Obligatorio> Precio
                {formik.touched.precio && formik.errors.precio ? (
                  <Error className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p>
                      <span className="font-bold">Error: </span>
                      {formik.errors.precio}
                    </p>
                  </Error>
                ) : null}
              </label>

              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="precio"
                type="number"
                placeholder="Precio del producto"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.precio}
              />
            </div>
            {/* Fin de Precio */}

            {/* Tipo de producto */}
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="tipoProducto"
            >
              <Obligatorio>*</Obligatorio> Categoría
              {formik.touched.tipoProducto && formik.errors.tipoProducto ? (
                <Error className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p>
                    <span className="font-bold">Error: </span>
                    {formik.errors.tipoProducto}
                  </p>
                </Error>
              ) : null}
            </label>

            <Select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="tipoProducto"
              value={formik.values.tipoProducto}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" label="Selecciona una categoría">
                Selecciona una categoría{" "}
              </option>
              <option value="Farmacia" label="Farmacia">
                {" "}
                Farmacia
              </option>
              <option value="Dulcería" label="Dulcería">
                {" "}
                Dulcería
              </option>
              <option value="Abarrote" label="Abarrote">
                {" "}
                Abarrote
              </option>
            </Select>
            {/* Fin de Tipo de producto */}

            {/* Botones */}
            <R>
              <input
                type="submit"
                className="bg-green-500 mt-5 p-2 text-white rounded font-bold hover:bg-green-600"
                value="Agregar nuevo producto"
              />
              <Link href="/productos">
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

export default NuevoProducto;
