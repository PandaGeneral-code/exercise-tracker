import React from "react";

import { DayScreen } from "./DayScreen";
import { DayScreenProvider } from "./DayScreenState";

export const DayScreenWrapper = () => (
  <DayScreenProvider>
    <DayScreen />
  </DayScreenProvider>
);
