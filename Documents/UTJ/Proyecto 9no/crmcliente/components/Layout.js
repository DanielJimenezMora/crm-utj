import React, { Fragment } from "react";
import Head from "next/head";
import Sidebar from "./Sidebar";
import Header from "./Header";
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
        <meta name="theme-color" content="rgb(15 23 42)" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      {router.pathname === "/login" || router.pathname === "/nuevacuenta" ? (
        <div>
          <div>{children}</div>
        </div>
      ) : (
        <div className="bg-neutral-100 min-h-screen">
          <div className="sm:flex min-h-screen">
            <Sidebar />
            <main className="sm:w-3/4 xl:w:-4/5 sm:min-h-screen p-5">
              <Header />
              {/* <Search /> */}
              {children}
            </main>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Layout;
