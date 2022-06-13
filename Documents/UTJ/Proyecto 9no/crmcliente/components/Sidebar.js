import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";

const OBTENER_USUARIO = gql`
  query obtenerUsuario {
    obtenerUsuario {
      id
      nombre
      apellido
      genero
    }
  }
`;

/* Styled Components */

const Aside = styled.aside`
  background-image: linear-gradient(
    to top,
    rgb(31 41 55) 0%,
    rgb(17 24 39) 100%
  );
`;

const Heading = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
`;

const Title = styled.p`
  padding-top: 1.5rem;
  padding-left: 1rem;
`;

const Item = styled.div`
  display: grid;
  grid-template-columns: 10% 90%;
  padding-left: 2rem;
  cursor: pointer;
`;

const ItemImg = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
  align-items: center;
  cursor: pointer;
`;

const Test = styled.div`
  border: 1px solid red;
`;

const ItemText = styled.a`
  padding-left: 1rem;
`;

const Usuario = styled.li`
  margin-bottom: 3rem;
`;

const Sidebar = () => {
  // Routing de Next.js
  const router = useRouter();

  // Querty Apollo
  const { data, loading, client } = useQuery(OBTENER_USUARIO);

  // Proteger que no se acceda a data antes de obtener resultados
  if (loading) return null;

  const { nombre, apellido, genero } = data.obtenerUsuario;

  return (
    <Aside className="sm:w-1/4 xl:w:-1/5 sm:min-h-screen p-5">
      {/* <aside className="bg-gray-800 sm:w-1/4 xl:w:-1/5 sm:min-h-screen p-5"> */}
      {/* Heading sidebar */}
      <Heading>
        {/* Logo */}
        <div>
          <Image width={84} height={104} src="/img/logo.png" />
        </div>
        {/* Nombre empresa */}
        <div>
          <Title className="text-white text-s sm:text-xl xl:text-xl">
            Dulces y medicina <br />
            popular "Morita"
          </Title>
        </div>
        <br />
      </Heading>
      <hr />
      {/* Menu */}
      <nav className="mt-5 list-none">
        <Usuario className="p-3">
          <ItemImg>
            <div>
              {genero === "Hombre" ? (
                <Image width={80} height={80} src="/img/icon/user1.png" />
              ) : genero === "Mujer" ? (
                <Image width={80} height={80} src="/img/icon/user2.png" />
              ) : null}
            </div>
            <ItemText className="text-white block">
              {nombre} {apellido}
            </ItemText>
          </ItemImg>
        </Usuario>

        <li className={router.pathname === "/" ? "bg-gray-900 p-3" : "p-3"}>
          <Link href="/">
            <Item>
              <div>
                <Image width={26} height={22} src="/img/icon/cliente.png" />
              </div>
              <ItemText className="text-white block">Clientes</ItemText>
            </Item>
          </Link>
        </li>
        <li
          className={router.pathname === "/pedidos" ? "bg-gray-900 p-3" : "p-3"}
        >
          <Link href="/pedidos">
            <Item>
              <div>
                <Image width={20} height={28} src="/img/icon/pedido.png" />
              </div>
              <ItemText className="text-white block">Pedidos</ItemText>
            </Item>
          </Link>
        </li>
        <li
          className={
            router.pathname === "/productos" ? "bg-gray-900 p-3" : "p-3"
          }
        >
          <Link href="/productos">
            <Item>
              <div>
                <Image width={26} height={22} src="/img/icon/carrito.png" />
              </div>
              <ItemText className="text-white block">Productos</ItemText>
            </Item>
          </Link>
        </li>

        <nav className="mt-5 list none">
          <div className="text-white text-xl ml-3 mb-3">Reportes</div>
          {/*  */}
          <li
            className={
              router.pathname === "/mejoresvendedores"
                ? "bg-gray-900 p-3"
                : "p-3"
            }
          >
            <Link href="/mejoresvendedores">
              <Item>
                <div class="text-white">
                  <svg
                    class="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 2a1 1 0 10-2 0v4a1 1 0 102 0V9zm-3 3a1 1 0 10-2 0v1a1 1 0 102 0v-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <ItemText className="text-white block mt-1">
                  Reporte de Ventas
                </ItemText>
              </Item>
            </Link>
          </li>
          {/*  */}
          <li
            className={
              router.pathname === "/mejoresclientes" ? "bg-gray-900 p-3" : "p-3"
            }
          >
            <Link href="/mejoresclientes">
              <Item>
                <div className="text-white">
                  <svg
                    class="w-7 h-7"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                  </svg>
                </div>
                <ItemText className="text-white block mt-1">
                  Reporte de Clientes
                </ItemText>
              </Item>
            </Link>
          </li>
        </nav>
      </nav>
    </Aside>
  );
};

export default Sidebar;
