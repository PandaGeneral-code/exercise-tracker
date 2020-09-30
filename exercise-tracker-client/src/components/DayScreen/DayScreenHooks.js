import { useCallback, useContext } from "react";

import {
  DayScreenContext,
  setDrawerVisibility,
  setExercises,
  setSelectedDate,
} from "./DayScreenState";

export const useDayScreenHelpers = () => {
  const { dispatch, state } = useContext(DayScreenContext);

  return {
    setDrawerVisibility: useCallback(
      (drawerVisibility) => dispatch(setDrawerVisibility(drawerVisibility)),
      [dispatch]
    ),
    setExercises: useCallback(
      (exercises) => dispatch(setExercises(exercises)),
      [dispatch]
    ),
    setSelectedDate: useCallback(
      (selectedDate) => dispatch(setSelectedDate(selectedDate)),
      [dispatch]
    ),
    state,
  };
};
