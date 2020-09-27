const SET_EXERCISES = "exerciseData/SET_EXERCISES";
const SET_MUSCLE_GROUPS = "exerciseData/SET_MUSCLE_GROUPS";

export const initialState = { exercises: [], muscleGroups: [] };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EXERCISES:
      return { ...state, exercises: action.exercises };
    default:
      return state;
  }
};

export const setExercises = (exercises) => ({ exercises, type: SET_EXERCISES });

export const setMuscleGroups = () => {};

export default reducer;
