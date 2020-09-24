import axios from "axios";
import { Button } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Wrapper } from "./styled";

export const Home = () => {
  const [message, setMessage] = useState(null);

  const handleTestFetch = async () => {
    try {
      const response = await axios.get("/api/");
      if (response.status === 200) {
        setMessage(() => response.data.message);
      } else {
        throw new Error("Could not fetch the message");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <Link to="/">
        <Button danger type="primary">
          Back to Root
        </Button>
      </Link>
      <Button danger onClick={handleTestFetch} type="dashed">
        Fetch from API
      </Button>
      <pre>{JSON.stringify({ message }, null, 2)}</pre>
    </Wrapper>
  );
};
