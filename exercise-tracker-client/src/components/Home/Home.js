import { Button } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setExercises } from "../../store/modules/exerciseData";
import { get } from "../../utils/api";

export const Home = () => {
  const dispatch = useDispatch();
  const { exerciseData } = useSelector((state) => state);

  const handleDispatchTest = async () => {
    const response = await get("/exercises");
    dispatch(setExercises(response.data.exercises));
  };

  return (
    <div>
      <pre>{JSON.stringify({ exerciseData }, null, 2)}</pre>
      <Button danger onClick={handleDispatchTest} type="primary">
        Test
      </Button>
    </div>
  );
};
