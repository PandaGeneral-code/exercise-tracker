import { get, post } from "./api";

export const addMuscleGroup = async (newMuscleGroup) => {
  try {
    const response = await post("muscles", newMuscleGroup);
    if (response.status === 201) {
      return response;
    } else {
      throw new Error(
        `Could not add ${newMuscleGroup.muscleGroupName}. Please try again later.`
      );
    }
  } catch (err) {
    return {
      message: err.message || "Something went wrong. Please try again later.",
      status: err.code || 500,
    };
  }
};

export const getMuscleGroups = async () => {
  try {
    const response = await get("muscles");
    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Could not load muscle groups. Please try again later.");
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};
