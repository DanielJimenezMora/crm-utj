import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

/* Styled Components */
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
  padding-left: 1rem;
  cursor: pointer;
`;

const ItemText = styled.a`
  padding-left: 1rem;
`;

const Sidebar = () => {
  // Routing de Next.js
  const router = useRouter();

  return (
    <aside className="bg-cyan-800 sm:w-1/4 xl:w:-1/5 sm:min-h-screen p-5">
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
        <li className={router.pathname === "/" ? "bg-cyan-900 p-3" : "p-3"}>
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
          className={router.pathname === "/pedidos" ? "bg-cyan-900 p-3" : "p-3"}
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
            router.pathname === "/productos" ? "bg-cyan-900 p-3" : "p-3"
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
      </nav>
    </aside>
  );
};

export default Sidebar;
