import React, { useContext, useState } from "react";
import Layout from "../components/Layout";
import AsignarCliente from "../components/pedidos/AsignarCliente";
import AsignarProductos from "../components/pedidos/AsignarProductos";
import ResumenPedido from "../components/pedidos/ResumenPedido";
import Total from "../components/pedidos/Total";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

// Context de pedidos
import PedidoContext from "../context/pedidos/PedidoContext";

/* GraphQL */
const NUEVO_PEDIDO = gql`
  mutation nuevoPedido($input: PedidoInput) {
    nuevoPedido(input: $input) {
      id
    }
  }
`;

const Nuevopedido = () => {
  const router = useRouter();

  const [mensaje, setMensaje] = useState(null);

  // Utilizar Context y extraer sus funciones y valores
  const pedidoContext = useContext(PedidoContext);
  const { cliente, productos, total } = pedidoContext;

  // Mutations para nuevo pedido
  const [nuevoPedido] = useMutation(NUEVO_PEDIDO);

  const validarPedido = () => {
    return !productos.every((producto) => producto.cantidad > 0) ||
      total === 0 ||
      cliente.length === 0
      ? " opacity-50 cursor-not-allowed "
      : "";
  };

  const crearNuevoPedido = async () => {
    const { id } = cliente;

    //Remover lo no deseado de productos
    const pedido = productos.map(
      ({
        __typename,
        existencia,
        existenciaDeseada,
        presentacion,
        tipoProducto,
        ...producto
      }) => producto
    );
    // console.log(pedido);

    try {
      const { data } = await nuevoPedido({
        variables: {
          input: {
            cliente: id,
            total,
            pedido,
          },
        },
      });
      // Redireccionar
      router.push("/pedidos");

      // Mostrar Alerta
      Swal.fire(
        "Pedido creado",
        "El pedido se registró correctamente",
        "success"
      );
    } catch (error) {
      setMensaje(error.message.replace("GraphQL error: ", ""));
      setTimeout(() => {
        setMensaje(null);
      }, 3000);
    }
  };

  const mostrarMensaje = () => {
    return (
      <div className="mt-10 my-2 bg-red-100 border-l-4 border-r-4 border-red-800 text-center text-red-700 p-2 text-sm rounded font-bold w-4/5">
        <p>{mensaje}</p>
      </div>
    );
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Nuevo Pedido</h1>
      <br />
      <hr />
      {mensaje && mostrarMensaje()}
      <AsignarCliente />
      <AsignarProductos />
      <ResumenPedido />
      <Total />

      <button
        type="button"
        className={` bg-cyan-800 w-4/5 rounded mt-5 p-3 text-white font-bold hover:bg-cyan-900 ${validarPedido()} `}
        onClick={() => crearNuevoPedido()}
      >
        Registrar pedido
      </button>
    </Layout>
  );
};

export default Nuevopedido;
