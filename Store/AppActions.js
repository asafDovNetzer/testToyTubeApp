export const setVideo = (videoInfo) => {
  return {
    type: `SET_VIDEO`,
    videoInfo: videoInfo,
  };
};

export const resetCount = () => {
  return {
    type: `RESET_COUNT`,
  };
};

export const startCount = () => {
  return {
    type: `START_COUNT`,
  };
};

export const stopCount = () => {
  return {
    type: `STOP_COUNT`,
  };
};
