import { Button, Dropdown, Menu } from "antd";
import {
  CalendarOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { useDayScreenHelpers } from "./DayScreenHooks";
import sampleWorkoutData from "./sampleWorkoutData.json";

import {
  H2,
  Header,
  HeaderButtonContainer,
  HeaderTitleContainer,
  RootWrapper,
} from "./styled";

import { AddWorkoutCommentDrawer } from "./components/drawers/AddWorkoutCommentDrawer/AddWorkoutCommentDrawer";

export const DayScreen = () => {
  const {
    setDrawerVisibility,
    setExercises,
    setSelectedDate,
    state: { drawerVisibility, exercises, selectedDate },
  } = useDayScreenHelpers();
  const { rootDimensions, today } = useSelector((state) => state.app);

  const handleShowCalendar = () =>
    setDrawerVisibility({ ...drawerVisibility, calendar: true });

  const handleShowComment = () =>
    setDrawerVisibility({ ...drawerVisibility, comment: true });

  useEffect(() => {
    setExercises(sampleWorkoutData);
    setSelectedDate(today);
  }, [setExercises, setSelectedDate, today]);

  return (
    <RootWrapper rootDimensions={rootDimensions}>
      {selectedDate && (
        <>
          <Header>
            <HeaderTitleContainer>
              <H2 style={{ margin: 0, padding: 0 }}>
                {selectedDate.format("LL")}
              </H2>
            </HeaderTitleContainer>
            <HeaderButtonContainer>
              <Button
                icon={<CalendarOutlined />}
                onClick={handleShowCalendar}
                size="large"
                shape="circle"
              />
              <Button icon={<PlusOutlined />} size="large" shape="circle" />
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item onClick={handleShowComment}>
                      Add Comment
                    </Menu.Item>
                  </Menu>
                }
                trigger={["click"]}
              >
                <Button
                  icon={<EllipsisOutlined />}
                  size="large"
                  shape="circle"
                />
              </Dropdown>
            </HeaderButtonContainer>
          </Header>
          <AddWorkoutCommentDrawer />
          <pre>
            {JSON.stringify(
              { drawerVisibility, exercises, selectedDate, today },
              null,
              2
            )}
          </pre>
        </>
      )}
    </RootWrapper>
  );
};
