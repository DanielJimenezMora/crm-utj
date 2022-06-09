import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Producto from "../components/Producto";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "@emotion/styled";

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

export default function Productos() {
  const router = new useRouter();
  const { data, loading, client } = useQuery(OBTENER_PRODUCTOS);
  const [productos, setProductos] = useState([]);
  const [search, setSearch] = useState("");
  const [selects, setSelects] = useState();

  const showData = async () => {
    const { data } = await client.query({
      query: OBTENER_PRODUCTOS,
    });
    setProductos(data.obtenerProductos);
  };

  const searcher = ({ target }) => {
    setSearch(target.value);
    console.log(target.value);
  };

  let resultados = [];
  if (!search) {
    resultados = productos;
  } else if (selects === "Nombre" || selects === "Filtrar") {
    resultados = productos.filter((producto) => {
      return producto.nombre.toLowerCase().includes(search.toLowerCase());
    });
  } /* else if (selects === "Presentacion") {
    resultados = productos.filter((producto) => {
      return producto.presentacion.toLowerCase().includes(search.toLowerCase());
    });
  } */ /* else if (selects === "precio") {
    resultados = productos.filter((producto) => {
      return producto.existencia.toLowerCase().includes(search.toLowerCase());
    });
  } else if (selects === "existencia") {
    resultados = productos.filter((producto) => {
      return producto.telefono.toLowerCase().includes(search.toLowerCase());
    });
  } else if (selects === "existenciaDeseada") {
    resultados = productos.filter((producto) => {
      return producto.existenciaDeseada
        .toLowerCase()
        .includes(search.toLowerCase());
    });
  }  */ else if (selects === "tipoProducto") {
    resultados = productos.filter((producto) => {
      return producto.tipoProducto.toLowerCase().includes(search.toLowerCase());
    });
  }

  useEffect(() => {
    showData();
  });

  if (loading) return <P>Cargando...</P>;

  if (!data.obtenerProductos) {
    client.clearStore();
    router.push("/login");
    return <P>Cargando...</P>;
  }

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Productos</h1>
        <br />
        <hr />

        <Link href="/nuevoproducto">
          <a class="bg-cyan-800 py-2 px-5 mt-3 inline-block text-white hover:bg-cyan-900  mb-3 rounded font-bold text-sm">
            Nuevo producto
          </a>
        </Link>
        <Select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="searchSelect"
          value={selects}
          onChange={({ target }) => setSelects(target.value)}
        >
          <option value="Filtrar" label="Seleccione filtro de búsqueda:">
            Filtrar
          </option>
          <option value="Nombre" label="Buscar por Nombre">
            Nombre
          </option>
          {/* <option value="Presentacion" label="Buscar por Presentación">
            Presentacion
          </option>
          <option value="precio" label="Buscar por Precio">
            precio
          </option>
          <option value="existencia" label="Buscar por Existencia">
            existencia
          </option>
          <option
            value="existenciaDeseada"
            label="Buscar por Existencia Deseada"
          >
            existenciaDeseada
          </option> */}
          <option value="tipoProducto" label="Categoría">
            tipoProducto
          </option>
        </Select>
        <input
          value={search}
          onChange={searcher}
          type="text"
          placeholder={"Buscar producto"}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />

        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-stone-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Presentación</th>
              <th className="w-1/5 py-2">Precio</th>
              <th className="w-1/5 py-2">Existencia</th>
              <th className="w-1/5 py-2">Existencia Deseada</th>
              <th className="w-1/5 py-2">Categoría</th>
              <th className="w-1/5 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {resultados.map((producto) => (
              <Producto key={producto.id} producto={producto} />
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
}
