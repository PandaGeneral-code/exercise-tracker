import { Button, Spin } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AddMuscleGroupDrawer } from "./drawers/AddMuscleGroupDrawer";
import { setMuscleGroups } from "../../store/modules/exerciseData";
import { MuscleGroupsContainer, Wrapper } from "./styled";
import { getMuscleGroups } from "../../utils/databaseHelpers";

const columns = [
  {
    dataIndex: "muscle_group_name",
    key: "muscleGroupName",
    sorter: (a, b) => a.muscle_group_name.localeCompare(b.muscle_group_name),
    title: "Muscle Group",
  },
  { dataIndex: "muscle_group_alias", key: "muscleGroupAlias", title: "Alias" },
];

export const Home = () => {
  const dispatch = useDispatch();
  const wrapperRef = useRef();
  const { muscleGroups } = useSelector((state) => state.exerciseData);
  const [sectionsLoading, setSectionsLoading] = useState({
    muscleGroups: false,
  });
  const [visibleDrawers, setVisibleDrawers] = useState({
    addMuscleGroup: false,
  });

  const [testHeight, setTestHeight] = useState(100);

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

  useEffect(() => {
    fetchMuscleGroups();
  }, [fetchMuscleGroups]);

  useEffect(() => {
    setTestHeight(() => wrapperRef.current.getBoundingClientRect().height);
  }, []);

  return (
    <Wrapper ref={wrapperRef}>
      <Spin spinning={sectionsLoading.muscleGroups}>
        <MuscleGroupsContainer rootHeight={testHeight}>
          <Button
            onClick={() =>
              setVisibleDrawers((visibleDrawers) => ({
                ...visibleDrawers,
                addMuscleGroup: true,
              }))
            }
          >
            test
          </Button>
          <div
            style={{ border: "1px solid black", height: `${testHeight / 5}px` }}
          ></div>
          <Button
            onClick={() =>
              setVisibleDrawers((visibleDrawers) => ({
                ...visibleDrawers,
                addMuscleGroup: true,
              }))
            }
          >
            test
          </Button>
          <div
            style={{ border: "1px solid black", height: `${testHeight / 5}px` }}
          ></div>
          <Button
            onClick={() =>
              setVisibleDrawers((visibleDrawers) => ({
                ...visibleDrawers,
                addMuscleGroup: true,
              }))
            }
          >
            test
          </Button>
          <div
            style={{ border: "1px solid black", height: `${testHeight / 5}px` }}
          ></div>
          <Button
            onClick={() =>
              setVisibleDrawers((visibleDrawers) => ({
                ...visibleDrawers,
                addMuscleGroup: true,
              }))
            }
          >
            test
          </Button>
          <div
            style={{ border: "1px solid black", height: `${testHeight / 5}px` }}
          ></div>
          <Button
            onClick={() =>
              setVisibleDrawers((visibleDrawers) => ({
                ...visibleDrawers,
                addMuscleGroup: true,
              }))
            }
          >
            test
          </Button>
          <div
            style={{ border: "1px solid black", height: `${testHeight / 5}px` }}
          ></div>
          <Button
            onClick={() =>
              setVisibleDrawers((visibleDrawers) => ({
                ...visibleDrawers,
                addMuscleGroup: true,
              }))
            }
          >
            test
          </Button>
          <div
            style={{ border: "1px solid black", height: `${testHeight / 5}px` }}
          ></div>
        </MuscleGroupsContainer>
      </Spin>
      <AddMuscleGroupDrawer
        controlProps={{ visibleDrawers, setVisibleDrawers }}
      />
    </Wrapper>
  );
};
