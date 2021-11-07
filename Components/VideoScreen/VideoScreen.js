import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { useSelector, useDispatch } from "react-redux";
import {
  startCount,
  stopCount,
  resetCount,
  pushVideoEntry,
} from "../../Store/Actions";
import { presentNumber } from "../../Helpers/HelperFunctions";

export default VideoModal = ({ navigation }) => {
  // const [playing, setPlaying] = React.useState(true);
  const [title, setTitle] = React.useState(``);
  const [description, setDescription] = React.useState(``);
  const [views, setViews] = React.useState(0);
  const [like, setLike] = React.useState(0);
  const [disike, setDislike] = React.useState(0);

  const dispatch = useDispatch();
  const videoInfo = useSelector((state) => state.videoInfo);

  if (!videoInfo) return null;

  React.useState(() => {
    navigation.addListener(`beforeRemove`, (e) => {
      dispatch(pushVideoEntry(videoInfo.id));
    });

    setTitle(videoInfo.title);
    setDescription(videoInfo.description);
    setViews(videoInfo.views);
    setLike(videoInfo.likes);
    setDislike(videoInfo.dislikes);
  }, [videoInfo]);

  const onStateChange = (newState) => {
    console.log(newState);
    if (newState === `unstarted`) dispatch(resetCount());
    if (newState === `ended`) dispatch(stopCount());
    if (newState === `playing`) dispatch(startCount());

    if (newState === `paused`) dispatch(stopCount());
  };

  return (
    <View style={{ flex: 1, justifyContent: `flex-start` }}>
      <YoutubePlayer
        height={300}
        play={true}
        videoId={videoInfo.id}
        onChangeState={onStateChange}
      />
      <View style={styles.info}>
        <Text style={{ textAlign: `center`, fontSize: 18 }}>{title}</Text>
        <ScrollView
          style={{
            height: 80,
            marginVertical: 15,
          }}
        >
          <Text>{description}</Text>
        </ScrollView>
        <View style={styles.smallPanel}>
          <Text>views: {presentNumber(views)}</Text>
          <Text>likes: {presentNumber(like)}</Text>
          <Text>dislikes: {presentNumber(disike)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  info: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 2,
    paddingHorizontal: 20,
    borderBottomColor: `black`,
    borderBottomWidth: 1,
    borderTopColor: `black`,
    borderTopWidth: 1,
  },
  smallPanel: {
    flexDirection: `row`,
    width: `100%`,
    justifyContent: `space-between`,
  },
});
