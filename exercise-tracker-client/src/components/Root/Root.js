import React from "react";
import { Provider as ReduxProvider } from "react-redux";

import { createCleanStore } from "../../store/configureStore";
import exerciseDataReducer from "../../store/modules/exerciseData";

import { Home } from "../Home/Home";

const store = createCleanStore({
  reducers: [{ reducer: exerciseDataReducer, reducerName: "exerciseData" }],
});

export const Root = () => {
  return (
    <ReduxProvider store={store}>
      <Home />
    </ReduxProvider>
  );
};
