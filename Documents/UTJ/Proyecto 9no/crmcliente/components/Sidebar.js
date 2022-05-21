import React from "react";
import styled from "@emotion/styled";

import Image from "next/image";

const Heading = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
`;

const Title = styled.p`
  padding-top: 1.5rem;
  padding-left: 1rem;
`;

const Test = styled.div``;

const Sidebar = () => {
  return (
    //<aside className="bg-cyan-800 w-4/5 sm:w-1/4 m:w-2/4 xl:w-1/4 sm:min-h-screen p-4 sm:p-6 xl:p-5">
    <aside className="bg-cyan-800 sm:w-13 xl:w:-1/5 sm:min-h-screen p-5">
      <Heading>
        <div>
          <Image width={84} height={104} src="/img/logo.png" />
        </div>
        <div>
          <Title className="text-white text-s sm:text-xl xl:text-xl">
            Dulces y medicina <br />
            popular "Morita"
          </Title>
        </div>
        <br />
      </Heading>
      <hr />
    </aside>
  );
};

export default Sidebar;
