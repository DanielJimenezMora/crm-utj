import React, { Fragment } from "react";
import Head from "next/head";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
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
      <div className="bg-gray-50 min-h-screen">
        <div className="flex min-h-screen">
          <Sidebar />
          {children}
        </div>
      </div>
    </Fragment>
  );
};

export default Layout;
