import React from "react";
import Layout from "../components/Layout";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const LoginContainer = styled.div`
  height: 34.3em;
  width: 60em;
  margin: 3em auto;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  border-radius: 30px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  @media screen and (max-width: 1000px) {
    width: 70%;
    margin-top: 3em;
  }
`;

const LoginInfoContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 0.5rem;
  background-color: #fff;
  border-radius: 0px 30px 30px 0px;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`;

const ImageContainer = styled.div`
  width: 50%;
  background-color: #fff;
  border-radius: 30px 0px 0px 30px;
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

const Title = styled.h1`
  text-transform: capitalize;
  font-size: 2.25rem;
  font-weight: 300;
  letter-spacing: 1px;
  color: #108598;
  padding-top: 3rem;
  padding-bottom: 1rem;
`;

const InputsContainer = styled.form`
  height: 70%;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Input = styled.input`
  width: 90%;
  height: 3.125rem;
  font-size: 1em;
  padding-left: 20px;
  border: none;
  border-radius: 5px;
  font-weight: 300;
  letter-spacing: 1px;
  box-sizing: border-box;
  &:hover {
    border: 2px solid #108598;
  }
`;
const Label = styled.label`
  display: none;
`;

const Btn = styled.button`
  width: 90%;
  height: 3.125rem;
  font-size: 1em;
  letter-spacing: 1px;
  color: #fff;
  border-radius: 5px;
  background-color: #108598;
  cursor: pointer;
  &:hover {
    background-color: #0f7d8e;
  }
`;

const Span = styled.span`
  color: #108598;
  font-weight: 400px;
  cursor: pointer;
`;

const NuevaCuenta = () => {
  return (
    <Layout>
      <LoginContainer>
        <ImageContainer>
          <Image width={457} height={551} src="/img/lobo.png" />
        </ImageContainer>
        <LoginInfoContainer>
          <Title>Crear Nueva Cuenta</Title>
          <InputsContainer>
            {/* Campo Nombre */}
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              className="focus:outline-none focus:shadow-outline"
              id="nombre"
              type="text"
              placeholder="Nombre Usuario"
            />
            {/* Campo Apellido */}
            <Label htmlFor="nombre">Apellido</Label>
            <Input
              className="focus:outline-none focus:shadow-outline"
              id="apellido"
              type="text"
              placeholder="Apellido Usuario"
            />
            {/* Campo Email */}
            <Label htmlFor="nombre">Correo</Label>
            <Input
              className="focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Correo"
            />
            {/* Campo Password */}
            <Label htmlFor="password">Password</Label>
            <Input
              className="focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Contraseña"
            />
            <Btn type="submit" value="Iniciar sesión">
              Crear cuenta
            </Btn>
            <Link href="/login">
              <a>
                <p>
                  Ya tienes cuenta? <Span>Iniciar sesión</Span>
                </p>
              </a>
            </Link>
          </InputsContainer>
        </LoginInfoContainer>
      </LoginContainer>
    </Layout>
  );
};

export default NuevaCuenta;
