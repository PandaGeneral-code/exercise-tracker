import { Button, Spin, Table } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AddMuscleGroupDrawer } from "./drawers/AddMuscleGroupDrawer";
import { setMuscleGroups } from "../../store/modules/exerciseData";
import { MuscleGroupsSection, Wrapper } from "./styled";
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
  const { muscleGroups } = useSelector((state) => state.exerciseData);
  const [sectionsLoading, setSectionsLoading] = useState({
    muscleGroups: false,
  });
  const [visibleDrawers, setVisibleDrawers] = useState({
    addMuscleGroup: false,
  });

  const fetchMuscleGroups = useCallback(async () => {
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

  return (
    <Wrapper>
      <Button
        onClick={() =>
          setVisibleDrawers((visibleDrawers) => ({
            ...visibleDrawers,
            addMuscleGroup: true,
          }))
        }
        type="primary"
      >
        Add Muscle Group
      </Button>
      <MuscleGroupsSection>
        <Spin spinning={sectionsLoading.muscleGroups}>
          <Table
            columns={columns}
            dataSource={muscleGroups.map((group) => ({
              ...group,
              key: group.muscle_group_id,
            }))}
            pagination={false}
          />
        </Spin>
        <AddMuscleGroupDrawer
          controlProps={{ visibleDrawers, setVisibleDrawers }}
        />
      </MuscleGroupsSection>
    </Wrapper>
  );
};
