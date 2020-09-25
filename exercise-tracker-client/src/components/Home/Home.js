import axios from "axios";
import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Wrapper } from "./styled";

export const Home = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(null);

  const handleFetchFromTheDatabase = async () => {
    try {
      const response = await axios.get("/api/values");
      if (response.status === 200) {
        setData(() => response.data.data);
      } else {
        throw new Error("Could not fetch the message");
      }
    } catch (err) {
      console.log(err);
    }
  };

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

  const handleTestFinish = async (values) => {
    console.log(values);
    try {
      const response = await axios.post("/api/values", { value: values.value });
      if (response.status === 201) {
        console.log(response);
      } else {
        throw new Error("Could not create the test value.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleTestSave = () => {
    form.submit();
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
      <Button onClick={handleFetchFromTheDatabase} type="primary">
        Fetch from the database
      </Button>
      <Form form={form} onFinish={handleTestFinish}>
        <Form.Item
          label="Please enter a test value"
          name="value"
          rules={[{ message: "Please enter a test value", required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button onClick={handleTestSave}>Save</Button>
        </Form.Item>
      </Form>
      <pre>{JSON.stringify({ data, message }, null, 2)}</pre>
    </Wrapper>
  );
};
