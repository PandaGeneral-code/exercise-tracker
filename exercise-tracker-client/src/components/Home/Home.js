import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

import { Wrapper } from "./styled";

export const Home = () => {
  return (
    <Wrapper>
      <Link to="/">
        <Button danger type="primary">
          Lets Root
        </Button>
      </Link>
    </Wrapper>
  );
};
