import Layout from "../components/Layout";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "@emotion/styled";

/* GraphQL */
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

/* Estilos */
const P = styled.p`
  color: #fff;
`;

export default function Index() {
  const router = new useRouter();

  // Consulta de apollo
  const { data, loading, client } = useQuery(OBTENER_CLIENTES_USUARIO);

  if (loading) return <P>Cargando...</P>;

  if (!data.obtenerClientesVendedor) {
    client.clearStore();
    router.push("/login");
    return <P>Cargando...</P>;
  }

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>
        <Link href="/nuevocliente">
          <a className="bg-cyan-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-cyan-900 mb-3 font-bold">
            Nuevo Cliente
          </a>
        </Link>

        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-stone-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Negocio</th>
              <th className="w-1/5 py-2">Telefono</th>
              <th className="w-1/5 py-2">Dirección</th>
              <th className="w-1/5 py-2">Correo</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.obtenerClientesVendedor.map((cliente) => (
              <tr key={cliente.id}>
                <td className="border px-4 py-2">
                  {cliente.nombre} {cliente.apellido}
                </td>
                <td className="border px-4 py-2">{cliente.nombreNegocio}</td>
                <td className="border px-4 py-2">{cliente.telefono}</td>
                <td className="border px-4 py-2">{cliente.direccion}</td>
                <td className="border px-4 py-2">{cliente.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
}
