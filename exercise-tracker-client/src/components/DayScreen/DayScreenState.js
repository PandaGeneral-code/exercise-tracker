import React, { createContext, useMemo, useReducer } from "react";

export const DayScreenContext = createContext();
export const initialState = {
  drawerVisibility: { calendar: false, comment: false },
  exercises: [],
  selectedDate: null,
};

const SET_DRAWER_VISIBILITY = "dayScreen/SET_DRAWER_VISIBILITY";
const SET_EXERCISES = "dayScreen/SET_EXERCISES";
const SET_SELECTED_DATE = "dayScreen/SET_SELECTED_DATE";

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_DRAWER_VISIBILITY:
      return { ...state, drawerVisibility: action.drawerVisibility };
    case SET_EXERCISES:
      return { ...state, exercises: action.exercises };
    case SET_SELECTED_DATE:
      return { ...state, selectedDate: action.selectedDate };
    default:
      return state;
  }
};

export const setDrawerVisibility = (drawerVisibility) => ({
  drawerVisibility,
  type: SET_DRAWER_VISIBILITY,
});

export const setExercises = (exercises) => ({ exercises, type: SET_EXERCISES });

export const setSelectedDate = (selectedDate) => ({
  selectedDate,
  type: SET_SELECTED_DATE,
});

export const DayScreenProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [memState, memDispatch] = useMemo(() => [state, dispatch], [
    state,
    dispatch,
  ]);

  return (
    <DayScreenContext.Provider
      value={{ dispatch: memDispatch, state: memState }}
    >
      {children}
    </DayScreenContext.Provider>
  );
};
