import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "styled-components";

import { Root } from "./components/Root/Root";
import { GlobalStyle } from "./GlobalStyle";
import { createCleanStore } from "./store/configureStore";
import { appReducer } from "./store/modules";
import * as theme from "./utils/theme";

const store = createCleanStore({
  reducers: [{ reducer: appReducer, reducerName: "app" }],
});

export const App = () => {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Root />
      </ThemeProvider>
    </ReduxProvider>
  );
};
