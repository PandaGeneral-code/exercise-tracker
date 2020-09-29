import { Badge, Button, Calendar, Drawer } from "antd";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

import { DateTextContainer, Header, RootWrapper } from "./styled";

import sampleWorkoutData from "./sampleWorkoutData.json";
console.log(sampleWorkoutData);

export const DayScreen = () => {
  const calendarContainerRef = useRef();
  const { rootDimensions, today } = useSelector((state) => state.app);
  const [selectedDate, setSelectedDate] = useState(null);
  const [visible, setVisible] = useState(true);

  const dateCellRender = (value) => {
    const thisDate = value.date();
    const thisDataFormatted = value.format("LL");
    return (
      <Badge dot={Object.keys(sampleWorkoutData).includes(thisDataFormatted)}>
        <div>
          {
            <DateTextContainer
              date={value.format("LL")}
              selectedDate={selectedDate}
              today={today}
            >
              <div>{thisDate}</div>
            </DateTextContainer>
          }
        </div>
      </Badge>
    );
  };

  const handleOpenCalendar = () => setVisible(() => true);

  return (
    <RootWrapper rootDimensions={rootDimensions}>
      <Header rootDimensions={rootDimensions}>
        <span>Exercises</span>
        <Button onClick={handleOpenCalendar}>OPEN CALENDAR</Button>
        <Button>ADD EXERCISE</Button>
        <Button>OPTIONS</Button>
      </Header>
      <Drawer
        height={
          calendarContainerRef?.current?.getBoundingClientRect().height + 125 ||
          0
        }
        onClose={() => setVisible(() => false)}
        placement="bottom"
        title={
          <span>
            <span>Select Date</span>
            <Button>Add</Button>
          </span>
        }
        visible={visible}
      >
        <div ref={calendarContainerRef}>
          <Calendar
            dateFullCellRender={dateCellRender}
            fullscreen={false}
            onChange={(e) => setSelectedDate(() => e.format("LL"))}
          />
        </div>
      </Drawer>
    </RootWrapper>
  );
};
