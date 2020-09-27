import { Button, Drawer, Form, Input, Rate, Select } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { AddExerciseDrawerButtonContainer, DrawerDiv, Wrapper } from "./styled";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const Root = () => {
  const [addExerciseForm] = Form.useForm();
  const drawerContainerRef = useRef();
  // 150px difference between the container and the drawer
  // 402
  const [drawerHeight, setDrawerHeight] = useState(0);
  const [isDrawerVisible, setIsDrawerVisible] = useState(true);

  const handleAddExercise = async () => {
    const newExercise = addExerciseForm.getFieldsValue();
    console.log(newExercise);
    try {
      const response = await axios.post(`/api/exercises`, newExercise);
      console.log(response);
      if (response.status === 201) {
        handleResetAddExerciseForm();
        handleHideDrawer();
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleHideDrawer = () => {
    setIsDrawerVisible(() => false);
  };

  const handleShowDrawer = () => setIsDrawerVisible(() => true);

  const handleResetAddExerciseForm = () => {
    addExerciseForm.resetFields();
  };

  const handleResize = () => {
    setDrawerHeight(
      () => drawerContainerRef.current.getBoundingClientRect().height + 150
    );
  };

  useEffect(() => {
    setDrawerHeight(
      () => drawerContainerRef.current.getBoundingClientRect().height + 150
    );
  }, []);

  return (
    <Wrapper>
      <Button danger onClick={handleShowDrawer} type="primary">
        Open Drawer
      </Button>
      <Button>Add Exercise</Button>
      <Link to="/home">
        <Button type="primary">Take Me Home</Button>
      </Link>
      <Drawer
        closable={true}
        footer={
          <AddExerciseDrawerButtonContainer>
            <Button danger>Reset</Button>
            <Button>Cancel</Button>
            <Button onClick={handleAddExercise} type="primary">
              Add Exercise
            </Button>
          </AddExerciseDrawerButtonContainer>
        }
        height={drawerHeight}
        onClose={handleHideDrawer}
        placement="bottom"
        title="Add Exercise"
        bodyStyle={{ overflow: "hidden" }}
        visible={isDrawerVisible}
      >
        <DrawerDiv ref={drawerContainerRef}>
          <Form
            form={addExerciseForm}
            onValuesChange={handleResize}
            {...layout}
          >
            <Form.Item
              name="exerciseName"
              rules={[
                { message: "Exercise name is required.", required: true },
              ]}
            >
              <Input placeholder="Exercise Name" />
            </Form.Item>
            <Form.Item name="exerciseDescription">
              <Input.TextArea
                autoSize={{ minRows: 2, maxRows: 6 }}
                placeholder="Exercise Description"
              />
            </Form.Item>
            <Form.Item name="exerciseAreasOfEffect">
              <Select
                allowClear
                mode="multiple"
                placeholder="Exercise Area of Effect"
              >
                {[
                  { id: 1, name: "Chest" },
                  { id: 2, name: "Back" },
                ].map(({ id, name }) => (
                  <Select.Option key={id} value={id}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="exerciseRating">
              <Rate />
            </Form.Item>
          </Form>
        </DrawerDiv>
      </Drawer>
    </Wrapper>
  );
};
