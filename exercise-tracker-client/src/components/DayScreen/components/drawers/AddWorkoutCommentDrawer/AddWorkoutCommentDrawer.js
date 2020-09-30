import { Button, Card, Drawer, Form, Input, message } from "antd";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";

import { useDayScreenHelpers } from "../../../DayScreenHooks";
import { FooterWrapper } from "./styled";

export const AddWorkoutCommentDrawer = () => {
  const {
    setDrawerVisibility,
    setExercises,
    state: { drawerVisibility, exercises, selectedDate },
  } = useDayScreenHelpers();
  const [addWorkoutCommentForm] = Form.useForm();

  const { rootDimensions } = useSelector((state) => state.app);

  const handleAddWorkoutComment = (values) => {
    const newCommentInformation = {
      commentBody: values.comment,
      commentId:
        Math.max(
          ...exercises[selectedDate.format("LL")].comments.map(
            (comment) => comment.commentId
          )
        ) + 1,
      commentCreatedAt: moment().toISOString(),
    };
    setExercises({
      ...exercises,
      [selectedDate.format("LL")]: {
        ...exercises[selectedDate.format("LL")],
        comments: [
          ...exercises[selectedDate.format("LL")].comments,
          newCommentInformation,
        ],
      },
    });
    setDrawerVisibility({ ...drawerVisibility, comment: false });
    addWorkoutCommentForm.resetFields();
    message.success("Comment added successfully.", 1);
  };

  const handleCancel = () => {
    setDrawerVisibility({ ...drawerVisibility, comment: false });
    if (addWorkoutCommentForm.getFieldValue("comment")) {
      message.warn("The comment text has been discarded", 1);
    }
    addWorkoutCommentForm.resetFields();
  };

  const handleDrawerClose = () => {
    setDrawerVisibility({ ...drawerVisibility, comment: false });
    if (addWorkoutCommentForm.getFieldValue("comment")) {
      message.info("The comment text has been preserved.", 1);
    }
  };

  return (
    <Drawer
      closable={false}
      destroyOnClose={true}
      footer={
        <FooterWrapper>
          <Button danger onClick={handleCancel} type="primary">
            Cancel
          </Button>
          <Button onClick={() => addWorkoutCommentForm.submit()} type="primary">
            Add Comment
          </Button>
        </FooterWrapper>
      }
      height={rootDimensions.height / 2}
      onClose={handleDrawerClose}
      placement="bottom"
      title="Add Workout Comment"
      visible={drawerVisibility.comment}
    >
      <Form
        autoComplete="off"
        form={addWorkoutCommentForm}
        onFinish={handleAddWorkoutComment}
      >
        <Form.Item
          name="comment"
          rules={[{ message: "Please add a comment", required: true }]}
        >
          <Input.TextArea
            autoSize={{ minRows: 4, maxRows: 4 }}
            onPressEnter={() => addWorkoutCommentForm.submit()}
            placeholder="Add a New Workout Comment"
          />
        </Form.Item>
      </Form>
      {exercises[selectedDate.format("LL")].comments.length > 0 && (
        <h3>Previous Comments</h3>
      )}
      {exercises[selectedDate.format("LL")].comments
        .sort((a, b) => b.commentId - a.commentId)
        .map(({ commentBody, commentId }) => (
          <Card
            extra={<Button type="link">Delete</Button>}
            key={commentId}
            size="small"
            style={{ marginBottom: "10px" }}
            title={`Comment ${commentId}`}
          >
            <div>{commentBody}</div>
          </Card>
        ))}
    </Drawer>
  );
};
