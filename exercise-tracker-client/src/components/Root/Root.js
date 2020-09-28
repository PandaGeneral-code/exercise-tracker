import React from "react";
import { Provider as ReduxProvider } from "react-redux";

import { GlobalStyle } from "./GlobalStyle";
import { Home } from "../Home/Home";
import { createCleanStore } from "../../store/configureStore";
import exerciseDataReducer from "../../store/modules/exerciseData";

const store = createCleanStore({
  reducers: [{ reducer: exerciseDataReducer, reducerName: "exerciseData" }],
});

export const Root = () => {
  return (
    <ReduxProvider store={store}>
      <GlobalStyle />
      <Home />
    </ReduxProvider>
  );
};
