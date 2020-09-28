const SET_ROOT_HEIGHT = "app/SET_ROOT_HEIGHT";

export const initialState = { rootHeight: null };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROOT_HEIGHT:
      return { ...state, rootHeight: action.rootHeight };
    default:
      return state;
  }
};

export const setRootHeight = (rootHeight) => ({
  rootHeight,
  type: SET_ROOT_HEIGHT,
});

export default reducer;
