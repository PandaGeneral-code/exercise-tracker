const FETCH_EXERCISES = "exercises/FETCH_EXERCISES";

export const initialState = { exercises: [] };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const fetchExercises = () => ({ type: FETCH_EXERCISES });
