const initialState = {
  user: undefined,
  token: null,
  videoInfo: null,
  accum: 0,
  lastStartTime: null,
  entries: [],
  searches: [],
  authErrorMessage: null,
  results: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `LOGIN`:
      return {
        ...state,
        user: action.userId,
        token: action.token,
      };
    case `SIGN_OUT`:
      return {
        ...state,
        user: null,
        token: null,
      };
    case `SET_VIDEO`:
      return {
        ...state,
        videoInfo: action.videoInfo,
      };
    case `START_COUNT`:
      return {
        ...state,
        lastStartTime: Date.now(),
      };
    case `STOP_COUNT`:
      return {
        ...state,
        accum: state.accum + Date.now() - state.lastStartTime,
        lastStartTime: null,
      };
    case `RESET_COUNT`:
      return {
        ...state,
        accum: 0,
        lastStartTime: null,
      };
    case `SET_STATS`:
      return {
        ...state,
        entries: action.entries,
        searches: action.searches,
      };
    case `SET_ERROR_MESSAGE`:
      return {
        ...state,
        authErrorMessage: action.message,
      };
    case `SET_RESULTS`:
      return {
        ...state,
        results: action.results,
      };
    default:
      return state;
  }
};

export default reducer;
