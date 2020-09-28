const ADD_MUSCLE_GROUP = "exerciseData/ADD_MUSCLE_GROUP";
const SET_EXERCISES = "exerciseData/SET_EXERCISES";
const SET_MUSCLE_GROUPS = "exerciseData/SET_MUSCLE_GROUPS";

export const initialState = { exercises: [], muscleGroups: [] };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MUSCLE_GROUP:
      return {
        ...state,
        muscleGroups: [action.newMuscleGroup, ...state.muscleGroups],
      };
    case SET_EXERCISES:
      return { ...state, exercises: action.exercises };
    case SET_MUSCLE_GROUPS:
      return { ...state, muscleGroups: action.muscleGroups };
    default:
      return state;
  }
};

export const addMuscleGroup = (newMuscleGroup) => ({
  newMuscleGroup,
  type: ADD_MUSCLE_GROUP,
});

export const setExercises = (exercises) => ({ exercises, type: SET_EXERCISES });

export const setMuscleGroups = (muscleGroups) => ({
  muscleGroups,
  type: SET_MUSCLE_GROUPS,
});

export default reducer;
