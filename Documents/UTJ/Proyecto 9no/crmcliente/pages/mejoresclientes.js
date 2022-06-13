import React, { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Layout from "../components/Layout";
import { gql, useQuery } from "@apollo/client";

const MEJORES_CLIENTES = gql`
  query mejoresClientes {
    mejoresClientes {
      cliente {
        nombre
        apellido
        genero
        nombreNegocio
      }
      total
    }
  }
`;

const MejoresClientes = () => {
  const { data, loading, error, startPolling, stopPolling } =
    useQuery(MEJORES_CLIENTES);

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return <p>Cargando...</p>;

  const { mejoresClientes } = data;

  const clienteGrafica = [];

  mejoresClientes.map((cliente, index) => {
    clienteGrafica[index] = {
      ...cliente.cliente[0],
      datosCliente:
        /* cliente.cliente[0].nombre + " " + cliente.cliente[0].apellido, */
        cliente.cliente[0].nombreNegocio,
      total: cliente.total,
      genero: cliente.cliente[0].genero,
    };
  });

  const ventaTotal = clienteGrafica.reduce(
    (total, cliente) => total + cliente.total,
    0
  );

  const ventaTotalM = clienteGrafica.reduce(
    (total, cliente) =>
      total + (cliente.genero === "Mujer" ? cliente.total : 0),
    0
  );

  const ventaTotalH = clienteGrafica.reduce(
    (total, cliente) =>
      total + (cliente.genero === "Hombre" ? cliente.total : 0),
    0
  );

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Reporte de Clientes</h1>
      <br />
      <hr />

      <div className="flex">
        <p className="flex shadow mr-4 mt-5 my-2 bg-white border-l-4 border-green-700 text-green-700 p-2 text-sm rounded font-bold w-1/3">
          <svg
            class="w-10 h-10"
            fill="green"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span className="mt-2">Venta total: ${ventaTotal}</span>
        </p>

        <p className="flex shadow mr-4 mt-5 my-2 bg-white border-l-4 border-cyan-700 text-cyan-700 p-2 text-sm rounded font-bold w-1/3">
          <svg
            class="w-10 h-10"
            fill="rgb(14 116 144)"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span className="mt-2">Compra Hombres: ${ventaTotalH}</span>
        </p>

        <p className="flex shadow mt-5 my-2 bg-white border-l-4 border-pink-500 text-pink-500 p-2 text-sm rounded font-bold w-1/3">
          <svg
            class="w-10 h-10"
            fill="rgb(236 72 153)"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span className="mt-2">Compra Mujeres: ${ventaTotalM}</span>
        </p>
      </div>

      <br />

      <ResponsiveContainer
        width="100%"
        height="70%"
        className="shadow bg-white rounded overflow-x-scroll w-full"
      >
        <BarChart
          width={1000}
          height={600}
          data={clienteGrafica}
          margin={{
            top: 25,
            right: 30,
            left: 20,
            bottom: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="datosCliente" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </Layout>
  );
};

export default MejoresClientes;
