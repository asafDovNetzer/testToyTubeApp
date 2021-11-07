// import { pushSearch } from "./Actions";
import { SEARCH_RESULT_NUM, YOUTUBE_API_KEY } from "../Settings";

export const pushSearch = (input) => {
  return async (dispatch, getState) => {
    const token = getState().token;

    const response = await fetch(
      `https://player-ef5cd-default-rtdb.firebaseio.com/searches.json?auth=${token}`,
      {
        method: `POST`,
        headers: {
          "Content-Type": `application/json`,
        },
        body: JSON.stringify({
          searchCriteria: input,
        }),
      }
    );

    const resData = await response.json();
    // console.log(resData, `push search`);
  };
};

export const search = (query) => {
  return async (dispatch) => {
    dispatch(pushSearch(query));

    const promises = [];
    const res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${SEARCH_RESULT_NUM}&q=${query}&key=${YOUTUBE_API_KEY}`
    ).then((res) => res.json());

    res.items.forEach((item) => {
      promises.push(createPromise(item.id.videoId));
    });

    await Promise.all(promises).then((responses) => {
      const list = [];
      responses.forEach((res) => {
        const item = res.items[0];
        if (!item) return;

        list.push({
          id: item.id,
          title: item.snippet.title,
          img: item.snippet.thumbnails.default,
          description: item.snippet.description,
          likes: parseInt(item.statistics.likeCount),
          dislikes: parseInt(item.statistics.dislikeCount),
          views: item.statistics.viewCount,
        });
      });

      dispatch(saveResults(list));
    });
  };
};

const saveResults = (results) => {
  return {
    type: `SET_RESULTS`,
    results: results,
  };
};

export const createPromise = async (videoId) => {
  return fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YOUTUBE_API_KEY}&part=snippet,contentDetails,statistics,status`
  ).then((res) => res.json());
};
