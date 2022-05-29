import React, { useState } from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "@emotion/styled";

const R = styled.div`
  text-align: right;
`;

const NuevoCliente = () => {
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      telefono: "",
      direccion: "",
      nombreNegocio: "",
      email: "",
    },
  });

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">
        Registrar nuevo cliente
      </h1>
      <br />
      <hr />

      <div className="mt-5">
        <div className="">
          <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nombre"
              >
                Nombre
              </label>

              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nombre"
                type="text"
                placeholder="Nombre Cliente"
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
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="telefono"
              >
                Teléfono
              </label>

              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="telefono"
                type="tel"
                placeholder="Teléfono Cliente"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="direccion"
              >
                Dirección
              </label>

              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="direccion"
                type="text"
                placeholder="Dirección del negocio"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nombreNegocio"
              >
                Nombre del negocio
              </label>

              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nombreNegocio"
                type="text"
                placeholder="Nombre del negocio"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nombreNegocio"
              >
                Correo electrónico
              </label>

              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Correo del cliente"
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
