import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

import { Wrapper } from "./styled";

export const Root = () => {
  return (
    <Wrapper>
      <Link to="/home">
        <Button type="primary">Take Me Home</Button>
      </Link>
    </Wrapper>
  );
};
