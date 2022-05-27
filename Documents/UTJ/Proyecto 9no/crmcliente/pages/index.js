import Head from "next/head";
import Layout from "../components/Layout";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

const OBTENER_CLIENTES_USUARIO = gql`
  query obtenerClientesVendedor {
    obtenerClientesVendedor {
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

export default function Index() {
  // Consulta de apollo
  const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);
  console.log(data);
  console.log(loading);
  console.log(error);

  if (loading) return "Cargando...";

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>

        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-zinc-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Negocio</th>
              <th className="w-1/5 py-2">Telefono</th>
              <th className="w-1/5 py-2">Dirección</th>
            </tr>
          </thead>
          <tablebody className="bg-white">
            <tr>
              <td className="border px-4 py-2"></td>
              <td className="border px-4 py-2"></td>
              <td className="border px-4 py-2"></td>
              <td className="border px-4 py-2"></td>
            </tr>
          </tablebody>
        </table>
      </Layout>
    </div>
  );
}
