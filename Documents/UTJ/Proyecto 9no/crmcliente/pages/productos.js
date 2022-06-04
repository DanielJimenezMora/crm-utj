import Layout from "../components/Layout";
import { gql, useQuery } from "@apollo/client";
import Producto from "../components/Producto";
import Link from "next/link";

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

export default function Productos() {
  // Consultar los productos

  const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);

  /*   console.log(data);
  console.log(loading);
  console.log(error); */

  if (loading) return <p>Cargando...</p>;

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
            {data.obtenerProductos.map((producto) => (
              <Producto key={producto.id} producto={producto} />
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
}
