import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Image from "next/image";
import Swal from "sweetalert2";

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

const P = styled.p`
  color: #fff;
`;

const Header = () => {
  const router = useRouter();
  // Querty Apollo
  const { data, loading, client } = useQuery(OBTENER_USUARIO);

  // Proteger que no se acceda a data antes de obtener resultados
  if (loading) return null;

  const { nombre, apellido } = data.obtenerUsuario;

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    client.clearStore();
    router.push("/login");
    return <P>Cargando...</P>;
  };

  const confirmar = () => {
    Swal.fire({
      title: "Cerrar sesión",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Cerrar sesión",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      showCloseButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          cerrarSesion();
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <>
      <Nav className="flex justify-between">
        <p className="mr-2">
          Hola: {nombre} {apellido}
        </p>

        <Heading>
          <button onClick={() => confirmar()} type="button">
            Cerrar sesión
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
