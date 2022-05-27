import React from "react";
import styled from "@emotion/styled";
import { useQuery, gql } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/router";

/* Estilos */
const Nav = styled.div`
  padding: 1rem;
  margin: -1.3rem;
  margin-bottom: 1rem;
  background-color: #b40d3f;
  color: #fff;
`;

const Img = styled.span`
  padding-left: 0.3rem;
  padding-top: 0.3rem;
`;

const Heading = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;
`;

/* GraphQL */
const OBTENER_USUARIO = gql`
  query obtenerUsuario {
    obtenerUsuario {
      id
      nombre
      apellido
    }
  }
`;

const Header = () => {
  /* Ruteo */
  const router = useRouter();

  // Query Apollo
  const { data, loading, client } = useQuery(OBTENER_USUARIO);

  // Proteger que no se acceda a data antes de obtener resultados
  if (loading) console.log("Cargando...");

  // Si no hay información

  const { nombre, apellido } = data.obtenerUsuario;

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    client.clearStore();
    router.push("/login");
  };

  return (
    <>
      <Nav className="flex justify-between">
        <p className="mr-2">
          Hola: {nombre} {apellido}
        </p>

        <Heading>
          <button onClick={() => cerrarSesion()} type="button">
            Cerrar sesión{" "}
          </button>
          <Img>
            <Image width={26} height={20} src="/img/icon/sign.png" />
          </Img>
        </Heading>
      </Nav>
      {/* <h1>Opciones</h1> */}
    </>
  );
};

export default Header;
