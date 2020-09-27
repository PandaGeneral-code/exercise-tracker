import { Button } from "antd";
import axios from "axios";
import React from "react";

export const Test = () => {
  const handleGetAllTheExercises = async () => {
    try {
      const response = await axios.get("/api/exercises");
      if (response.status === 200) {
        console.log(response.data.exercises);
      } else {
        throw new Error(
          "Could not fetch the list of exercises. Please try again later."
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Button danger onClick={handleGetAllTheExercises} type="primary">
      GET ALL THE EXERCISES
    </Button>
  );
};
