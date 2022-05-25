import React, { Fragment } from "react";
import Head from "next/head";
import styled from "@emotion/styled";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  // Hook de Routing
  const router = useRouter();

  return (
    <Fragment>
      <Head>
        <title>Sale Admin Pro - Dulces y medicina popular "Morita"</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <meta name="theme-color" content="rgb(22 78 99)" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      {router.pathname === "/login" || router.pathname === "/nuevacuenta" ? (
        <div className="">
          <div>{children}</div>
        </div>
      ) : (
        <div className="bg-gray-50 min-h-screen">
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="sm:w-2/4 xl:w:-4/5 sm:min-h-screen p-5">
              {children}
            </main>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Layout;
