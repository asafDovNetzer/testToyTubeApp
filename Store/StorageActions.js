export const getAllData = () => {
  return async (dispatch, getState) => {
    const token = getState().token;

    const responseEntries = await fetch(
      `https://player-ef5cd-default-rtdb.firebaseio.com/watchEntries.json?auth=${token}`,
      {
        method: `GET`,
        headers: {
          "Content-Type": `application/json`,
        },
      }
    );

    const responseSearch = await fetch(
      `https://player-ef5cd-default-rtdb.firebaseio.com/searches.json?auth=${token}`,
      {
        method: `GET`,
        headers: {
          "Content-Type": `application/json`,
        },
      }
    );

    const entries = await responseEntries.json();
    const searches = await responseSearch.json();

    dispatch(saveStatsToState(entries, searches));
  };
};

const saveStatsToState = (entries, searches) => {
  return {
    type: `SET_STATS`,
    entries: entries,
    searches: searches,
  };
};

export const pushVideoEntry = (videoId) => {
  return async (dispatch, getState) => {
    // try {
    const userId = getState().user;
    const token = getState().token;
    const lastStartTime = getState().lastStartTime;
    const accum = getState().accum;

    const duration = !!lastStartTime
      ? accum + Date.now() - lastStartTime
      : accum;

    if (!duration) return;
    // console.log(token, `pushing`);
    const response = await fetch(
      `https://player-ef5cd-default-rtdb.firebaseio.com/watchEntries.json?auth=${token}`,
      {
        method: `POST`,
        headers: {
          "Content-Type": `application/json`,
        },
        body: JSON.stringify({
          videoId: videoId,
          duration: duration,
          userId: userId,
        }),
      }
    );

    const resData = await response.json();
    console.log(resData);
  };
};
