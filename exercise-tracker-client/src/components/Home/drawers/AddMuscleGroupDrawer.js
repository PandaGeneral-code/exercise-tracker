import { Button, Drawer, Form, Input, notification, Spin } from "antd";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addMuscleGroup } from "../../../utils/databaseHelpers";
import { addMuscleGroup as addReduxMuscleGroup } from "../../../store/modules/exerciseData";

import {
  DrawerFooterWrapper,
  MainButtonContainer,
  ResetButtonContainer,
} from "./styled";

export const AddMuscleGroupDrawer = ({
  controlProps: { visibleDrawers, setVisibleDrawers },
}) => {
  const dispatch = useDispatch();
  const [addMuscleGroupForm] = Form.useForm();
  const muscleGroupNameInputRef = useRef();
  const { muscleGroups } = useSelector((state) => state.exerciseData);
  const [loading, setLoading] = useState(false);

  const handleDrawerClose = () => {
    setVisibleDrawers((visibleDrawers) => ({
      ...visibleDrawers,
      addMuscleGroup: false,
    }));
  };

  const handleDrawerReset = () => {
    addMuscleGroupForm.resetFields();
    handleDrawerClose();
  };

  const handleSubmit = async (values) => {
    setLoading(() => true);
    const response = await addMuscleGroup(values);
    if (response.status === 201) {
      dispatch(addReduxMuscleGroup(response.data.newMuscleGroup));
      handleDrawerReset();
      notification.success({
        description: `${response.data.newMuscleGroup.muscle_group_name} added successfully!`,
        message: "Success",
      });
    } else {
      notification.error({ description: response.message, message: "Error" });
    }
    setLoading(() => false);
  };

  return (
    <Drawer
      afterVisibleChange={() => muscleGroupNameInputRef.current.focus()}
      closable={true}
      footer={
        <DrawerFooterWrapper>
          <ResetButtonContainer>
            <Button danger onClick={handleDrawerReset}>
              Reset
            </Button>
          </ResetButtonContainer>
          <MainButtonContainer>
            <Button onClick={handleDrawerClose}>Cancel</Button>
            <Button onClick={() => addMuscleGroupForm.submit()} type="primary">
              Add
            </Button>
          </MainButtonContainer>
        </DrawerFooterWrapper>
      }
      height={300}
      onClose={handleDrawerClose}
      placement="bottom"
      title="Add Muscle Group"
      visible={visibleDrawers.addMuscleGroup}
    >
      <Spin spinning={loading}>
        <Form
          autoComplete="off"
          form={addMuscleGroupForm}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="muscleGroupName"
            rules={[
              {
                message: "Please enter a name for a new muscle group",
                required: true,
              },
              () => ({
                validator(rule, value) {
                  if (
                    muscleGroups.some(
                      (group) =>
                        group.muscle_group_name.toLowerCase() ===
                        value.toLowerCase()
                    )
                  ) {
                    return Promise.reject(
                      "An exercise group with the same name already exists."
                    );
                  } else {
                    return Promise.resolve();
                  }
                },
              }),
            ]}
          >
            <Input
              autoFocus
              placeholder="Muscle Group Name"
              ref={muscleGroupNameInputRef}
            />
          </Form.Item>
          <Form.Item name="muscleGroupAlias">
            <Input placeholder="Muscle Group Alias" />
          </Form.Item>
        </Form>
      </Spin>
    </Drawer>
  );
};
