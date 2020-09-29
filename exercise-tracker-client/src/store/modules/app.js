const SET_MOBILE = "app/SET_IS_MOBILE";
const SET_ORIENTATION = "app/SET_ORIENTATION";
const SET_ROOT_DIMENSIONS = "app/SET_ROOT_DIMENSIONS";
const SET_TODAY = "app/SET_TODAY";

export const initialState = {
  orientation: null,
  mobile: null,
  rootDimensions: { height: null, width: null },
  today: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORIENTATION:
      return { ...state, orientation: action.orientation };
    case SET_MOBILE:
      return { ...state, mobile: action.mobile };
    case SET_ROOT_DIMENSIONS:
      return { ...state, rootDimensions: action.rootDimensions };
    case SET_TODAY:
      return { ...state, today: action.today };
    default:
      return state;
  }
};

export const setOrientation = (orientation) => ({
  orientation,
  type: SET_ORIENTATION,
});

export const setMobile = (mobile) => ({ mobile, type: SET_MOBILE });

export const setRootDimensions = (rootDimensions) => ({
  rootDimensions,
  type: SET_ROOT_DIMENSIONS,
});

export const setToday = (today) => ({ today, type: SET_TODAY });

export default reducer;
