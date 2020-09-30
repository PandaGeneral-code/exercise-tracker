import {
  Button,
  Calendar,
  Card,
  Divider,
  Drawer,
  Dropdown,
  Form,
  Input,
  Menu,
} from "antd";
import {
  CalendarOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { NotificationDateCell } from "./components/NotificationDateCell/NotificationDateCell";
import sampleWorkoutData from "./sampleWorkoutData.json";
import { DateTextContainer, Header, RootWrapper } from "./styled";

export const DayScreen = () => {
  const [addCommentForm] = Form.useForm();
  const calendarContainerRef = useRef();
  const { rootDimensions, today } = useSelector((state) => state.app);
  const [data, setData] = useState(sampleWorkoutData);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [drawerVisibility, setDrawerVisibility] = useState({
    calendar: true,
    comment: false,
  });

  const handleAddComment = (values) => {
    const formattedSelectedData = selectedDate.format("LL");
    if (data[formattedSelectedData]) {
      setData((data) => ({
        ...data,
        [selectedDate.format("LL")]: {
          ...data[selectedDate.format("LL")],
          comments: [
            values.comment,
            ...data[selectedDate.format("LL")].comments,
          ],
        },
      }));
    } else {
      setData((data) => ({
        ...data,
        [formattedSelectedData]: { comments: [values.comment] },
      }));
    }
    addCommentForm.resetFields();
    setDrawerVisibility((drawerVisibility) => ({
      ...drawerVisibility,
      comment: false,
    }));
  };

  const handleCloseCalendar = () =>
    setDrawerVisibility((drawerVisibility) => ({
      ...drawerVisibility,
      calendar: false,
    }));

  const handleCloseComment = () =>
    setDrawerVisibility((drawerVisibility) => ({
      ...drawerVisibility,
      comment: false,
    }));

  const handleOpenCalendar = () =>
    setDrawerVisibility((drawerVisibility) => ({
      ...drawerVisibility,
      calendar: true,
    }));

  const handleOpenComment = () => {
    setIsMenuVisible(() => false);
    setDrawerVisibility((drawerVisibility) => ({
      ...drawerVisibility,
      comment: true,
    }));
  };

  useEffect(() => {
    if (today) {
      setSelectedDate(() => today);
    }
  }, [today]);

  return (
    <RootWrapper rootDimensions={rootDimensions}>
      <Header rootDimensions={rootDimensions}>
        <h3>{selectedDate?.format("LL")}</h3>
        <Button
          icon={<CalendarOutlined />}
          onClick={handleOpenCalendar}
          type="text"
        />
        <Button icon={<PlusOutlined />} type="text" />
        <Dropdown
          onVisibleChange={(e) => setIsMenuVisible(() => e)}
          overlay={
            <Menu onClick={() => {}}>
              <Menu.Item onClick={handleOpenComment}>Add Comment</Menu.Item>
              <Menu.Item>Analysis</Menu.Item>
            </Menu>
          }
          trigger={["click"]}
          visible={isMenuVisible}
        >
          <Button icon={<EllipsisOutlined />} type="text" />
        </Dropdown>
      </Header>
      {selectedDate &&
        data[selectedDate.format("LL")]?.comments?.map((comment) => (
          <Card>
            <Card.Meta description={comment} title="Comment 1" />
          </Card>
        ))}
      <pre>
        {JSON.stringify(
          {
            data,
            exercises: data[selectedDate?.format("LL")],
            selectedDate,
            today,
          },
          null,
          2
        )}
      </pre>
      <Drawer
        footer={
          <Button onClick={() => addCommentForm.submit()} type="primary">
            Save
          </Button>
        }
        onClose={handleCloseComment}
        placement="bottom"
        title="Add Workout Comment"
        visible={drawerVisibility.comment}
      >
        <Form form={addCommentForm} onFinish={handleAddComment}>
          <Form.Item name="comment">
            <Input.TextArea placeholder="Enter workout comment" rows={4} />
          </Form.Item>
        </Form>
      </Drawer>
      <Drawer
        height={
          calendarContainerRef?.current?.getBoundingClientRect().height + 103 ||
          507
        }
        onClose={handleCloseCalendar}
        placement="bottom"
        title="Select Date"
        visible={drawerVisibility.calendar}
      >
        <div ref={calendarContainerRef}>
          <Calendar
            defaultValue={today || moment()}
            dateCellRender={(value) => NotificationDateCell(value, data)}
            fullscreen={false}
            onChange={(e) => setSelectedDate(() => e)}
            value={selectedDate || moment()}
          />
          <Divider style={{ margin: "5px" }} />
          <Button
            block
            onClick={() => setSelectedDate(() => today)}
            size="large"
            type="link"
          >
            Today
          </Button>
        </div>
      </Drawer>
    </RootWrapper>
  );
};
