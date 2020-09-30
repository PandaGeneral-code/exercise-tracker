import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import {
  setMobile,
  setOrientation,
  setRootDimensions,
  setToday,
} from "../../store/modules/app";

// import { DayScreen } from "../DayScreen/DayScreen";
import { DayScreenWrapper } from "../DayScreen/DayScreenWrapper";

export const Root = () => {
  const dispatch = useDispatch();
  const { mobile } = useSelector((state) => state.app);

  const handleOrientationChange = (e) => {
    dispatch(setOrientation(e.target.screen.orientation.angle));
    dispatch(
      setRootDimensions({
        height: e.target.screen.height,
        width: e.target.screen.width,
      })
    );
  };

  const handleResize = () => {
    if (!mobile) {
      dispatch(
        setRootDimensions({
          height: window.innerHeight,
          width: window.innerWidth,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(
      setMobile(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      )
    );
    dispatch(setOrientation(window.screen.orientation.angle));
    dispatch(
      setRootDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      })
    );
    dispatch(setToday(moment()));
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener("orientationchange", handleOrientationChange);
    window.addEventListener("resize", handleResize);
    return () => {
      window.addEventListener("orientationchange", handleOrientationChange);
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <Router>
      <Switch>
        {" "}
        <Route component={DayScreenWrapper} path="/" />{" "}
      </Switch>
    </Router>
  );
};
