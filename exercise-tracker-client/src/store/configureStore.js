import { combineReducers, createStore } from "redux";

export const createCleanStore = ({ reducers }) => {
  const allReducers = combineReducers(
    reducers.reduce(
      (acc, { reducerName, reducer }) => ({ ...acc, [reducerName]: reducer }),
      {}
    )
  );

  return createStore(allReducers);
};
