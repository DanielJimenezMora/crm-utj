import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Cliente from "../components/Clientes";
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
      genero
    }
  }
`;

/* Estilos */
const P = styled.p`
  color: #fff;
`;

const Select = styled.select`
  width: 100%;
  height: 2.3rem;
  background-color: #fff;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  font-weight: 300;
  letter-spacing: 1px;
  box-sizing: border-box;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
`;

const ContainerTab = styled.div`
  height: 60vh;
  border-radius: 10px !important;
`;

export default function Index() {
  const router = new useRouter();
  const { data, loading, client } = useQuery(OBTENER_CLIENTES_USUARIO);
  const [clientes, setClientes] = useState([]);
  const [search, setSearch] = useState("");
  const [selects, setSelects] = useState();

  const showData = async () => {
    const { data } = await client.query({
      query: OBTENER_CLIENTES_USUARIO,
    });
    setClientes(data.obtenerClientesVendedor);
  };

  const searcher = ({ target }) => {
    setSearch(target.value);
    console.log(target.value);
  };

  let resultados = [];
  if (!search) {
    resultados = clientes;
  } else if (selects === "Nombre" || selects === "Filtrar") {
    resultados = clientes.filter((cliente) => {
      return cliente.nombre.toLowerCase().includes(search.toLowerCase());
    });
  } else if (selects === "Apellido") {
    resultados = clientes.filter((cliente) => {
      return cliente.apellido.toLowerCase().includes(search.toLowerCase());
    });
  } else if (selects === "nombreNegocio") {
    resultados = clientes.filter((cliente) => {
      return cliente.nombreNegocio.toLowerCase().includes(search.toLowerCase());
    });
  } else if (selects === "Tel??fono") {
    resultados = clientes.filter((cliente) => {
      return cliente.telefono.toLowerCase().includes(search.toLowerCase());
    });
  } else if (selects === "Direcci??n") {
    resultados = clientes.filter((cliente) => {
      return cliente.direccion.toLowerCase().includes(search.toLowerCase());
    });
  } else if (selects === "Correo") {
    resultados = clientes.filter((cliente) => {
      return cliente.email.toLowerCase().includes(search.toLowerCase());
    });
  }

  useEffect(() => {
    showData();
  });

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
        <br />
        <hr />
        <Link href="/nuevocliente">
          <a className="bg-cyan-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-cyan-900 mb-3 font-bold w-full lg:w-auto text-center">
            Nuevo Cliente
          </a>
        </Link>

        <Select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="searchSelect"
          value={selects}
          onChange={({ target }) => setSelects(target.value)}
        >
          <option value="Filtrar" label="Seleccione filtro de b??squeda:">
            Filtrar
          </option>
          <option value="Nombre" label="Buscar por Nombre">
            Nombre
          </option>
          <option value="Apellido" label="Buscar por Apellido">
            Apellido
          </option>
          <option value="nombreNegocio" label="Buscar por Nombre de negocio">
            nombreNegocio
          </option>
          <option value="Tel??fono" label="Buscar por Tel??fono">
            Tel??fono
          </option>
          <option value="Direcci??n" label="Buscar por Direcci??n">
            Direcci??n
          </option>
          <option value="Correo" label="Buscar por Correo">
            Correo
          </option>
        </Select>
        <input
          value={search}
          onChange={searcher}
          type="text"
          placeholder="Buscar cliente"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />

        <ContainerTab className="overflow-x-scroll shadow mt-5">
          <table className="table-auto shadow-md w-full w-lg">
            <thead className="bg-stone-800 rounded">
              <tr className="text-white">
                <th className="w-1/5 py-2">Nombre</th>
                <th className="w-1/5 py-2">Negocio</th>
                <th className="w-1/5 py-2">Tel??fono</th>
                <th className="w-1/5 py-2">Direcci??n</th>
                <th className="w-1/5 py-2">Correo</th>
                <th className="w-1/5 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {resultados.map((cliente) => (
                <Cliente key={cliente.id} cliente={cliente} />
              ))}
            </tbody>
          </table>
        </ContainerTab>
      </Layout>
    </div>
  );
}
