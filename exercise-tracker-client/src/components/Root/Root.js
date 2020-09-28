import React from "react";
import { Provider as ReduxProvider } from "react-redux";

import { GlobalStyle } from "./GlobalStyle";
import { Home } from "../Home/Home";
import { TestUI } from "../TestUI/TestUI";
import { createCleanStore } from "../../store/configureStore";
import appReducer from "../../store/modules/app";
import exerciseDataReducer from "../../store/modules/exerciseData";

const store = createCleanStore({
  reducers: [
    { reducer: appReducer, reducerName: "app" },
    { reducer: exerciseDataReducer, reducerName: "exerciseData" },
  ],
});

export const Root = () => {
  return (
    <ReduxProvider store={store}>
      <GlobalStyle />
      <TestUI />
    </ReduxProvider>
  );
};
