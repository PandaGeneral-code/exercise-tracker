import { Button, Card, Spin } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AddMuscleGroupDrawer } from "./drawers/AddMuscleGroupDrawer";
import { setMuscleGroups } from "../../store/modules/exerciseData";
import {
  setOrientation,
  setMobile,
  setRootDimensions,
} from "../../store/modules/app";
import { CardContainer, Wrapper } from "./styled";
import { getMuscleGroups } from "../../utils/databaseHelpers";

export const Home = () => {
  const dispatch = useDispatch();
  const { muscleGroups } = useSelector((state) => state.exerciseData);
  const { orientation, mobile, rootDimensions } = useSelector(
    (state) => state.app
  );
  const [sectionsLoading, setSectionsLoading] = useState({
    muscleGroups: false,
  });
  const [visibleDrawers, setVisibleDrawers] = useState({
    addMuscleGroup: false,
  });

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
    width: "50%",
  };

  return (
    <Wrapper rootHeight={rootDimensions.height}>
      <Spin spinning={sectionsLoading.muscleGroups}>
        <Button
          onClick={() =>
            setVisibleDrawers((visibleDrawers) => ({
              ...visibleDrawers,
              addMuscleGroup: true,
            }))
          }
          type="primary"
        >
          Open Drawer
        </Button>
        <Card title="Display Information">
          <Card.Grid style={gridStyle}>
            <div>
              <h4>Height</h4>
              <div>{rootDimensions.height}</div>
            </div>
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <div>
              <h4>Width</h4>
              <div>{rootDimensions.width}</div>
            </div>
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <div>
              <h4>Orientation</h4>
              <div>{!orientation ? "Portrait" : "Landscape"}</div>
            </div>
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <div>
              <h4>Mobile</h4>
              <div>{mobile ? "Mobile" : "Not Mobile"}</div>
            </div>
          </Card.Grid>
          <Card.Grid style={{ width: "100%", textAlign: "center" }}>
            <div>
              <h4>Random</h4>
              <div>Hello</div>
            </div>
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <div>
              <h4>Height</h4>
              <div>{rootDimensions.height}</div>
            </div>
          </Card.Grid>
        </Card>
      </Spin>
      <AddMuscleGroupDrawer
        controlProps={{ visibleDrawers, setVisibleDrawers }}
      />
    </Wrapper>
  );
};
