import { Button, Card, Form, Input, Spin } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setMuscleGroups } from "../../store/modules/exerciseData";
import {
  setOrientation,
  setMobile,
  setRootDimensions,
} from "../../store/modules/app";
import { Wrapper } from "./styled";
import { getMuscleGroups } from "../../utils/databaseHelpers";

export const Home = () => {
  const dispatch = useDispatch();
  const [addMuscleGroupForm] = Form.useForm();
  const { muscleGroups } = useSelector((state) => state.exerciseData);
  const { mobile, rootDimensions } = useSelector((state) => state.app);
  const [sectionsLoading, setSectionsLoading] = useState({
    muscleGroups: false,
  });

  const [addMuscleGroupDialogOpen, setAddMuscleGroupDialogOpen] = useState(
    false
  );

  const fetchMuscleGroups = useCallback(async () => {
    setSectionsLoading((sectionsLoading) => ({
      ...sectionsLoading,
      muscleGroups: true,
    }));
    const response = await getMuscleGroups();
    dispatch(setMuscleGroups(response.data.muscleGroups));
    setSectionsLoading((sectionsLoading) => ({
      ...sectionsLoading,
      muscleGroups: false,
    }));
  }, [dispatch]);

  const handleResize = () => {
    if (!mobile) {
      dispatch(
        setRootDimensions({
          height: window.innerHeight,
          width: window.innerWidth,
        })
      );
    }
  };

  const handleOrientationChange = (event) => {
    dispatch(setOrientation(event.target.screen.orientation.angle));
    dispatch(
      setRootDimensions({
        height: event.target.screen.height,
        width: event.target.screen.width,
      })
    );
  };

  useEffect(() => {
    fetchMuscleGroups();
  }, [fetchMuscleGroups]);

  const testMobile = () =>
    dispatch(
      setMobile(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      )
    );

  useEffect(() => {
    testMobile();
    handleResize();
    dispatch(setOrientation(window.screen.orientation.angle));
    dispatch(
      setRootDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      })
    );
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleOrientationChange);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  });

  const gridStyle = {
    cursor: "pointer",
    width: "50%",
  };

  return (
    <Wrapper rootHeight={rootDimensions.height}>
      <Spin spinning={sectionsLoading.muscleGroups}>
        <Card title="Muscle Groups">
          {muscleGroups?.map((group) => (
            <Card.Grid key={group.muscle_group_id} style={gridStyle}>
              <div>
                <h4>{group.muscle_group_name}</h4>
                <div>{group.muscle_group_alias}</div>
              </div>
            </Card.Grid>
          ))}
        </Card>
        <Card
          hoverable
          onClick={
            addMuscleGroupDialogOpen
              ? null
              : () => setAddMuscleGroupDialogOpen(() => true)
          }
          style={{ ...gridStyle, textAlign: "center" }}
        >
          {addMuscleGroupDialogOpen ? (
            <>
              <h2>New Muscle Group</h2>
              <Form autoComplete="off" form={addMuscleGroupForm}>
                <Form.Item name="muscleGroupName">
                  <Input placeholder="Muscle Group Name" />
                </Form.Item>
                <Form.Item name="muscleGroupAlias">
                  <Input placeholder="Muscle Group Alias" />
                </Form.Item>
                <Form.Item>
                  <div>
                    <Button
                      onClick={() => setAddMuscleGroupDialogOpen(() => false)}
                    >
                      Cancel
                    </Button>
                    <Button type="primary">Save</Button>
                  </div>
                </Form.Item>
              </Form>
            </>
          ) : (
            <h4>Add</h4>
          )}
        </Card>
      </Spin>
    </Wrapper>
  );
};
