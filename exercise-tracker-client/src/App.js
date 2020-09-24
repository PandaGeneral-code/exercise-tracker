import "antd/dist/antd.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Home } from "./components/Home/Home";
import { Root } from "./components/Root/Root";

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={Home} exact path="/home" />
        <Route component={Root} path="/" />
      </Switch>
    </Router>
  );
};
