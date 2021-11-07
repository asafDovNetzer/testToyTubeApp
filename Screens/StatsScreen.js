import React from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { useSelector } from "react-redux";
import { ADMIN_ID } from "../Settings";
import { millisecsToString } from "../Helpers/HelperFunctions";

export default StatsScreen = ({ navigation }) => {
  const [duration, setDuration] = React.useState(``);
  const [videosList, setVideosList] = React.useState([]);
  const [searchList, setSearchList] = React.useState([]);

  const userId = useSelector((state) => state.user);
  const entries = useSelector((state) => state.entries);
  const searches = useSelector((state) => state.searches);

  React.useEffect(() => {
    if (userId !== ADMIN_ID) navigation.navigate(`Home`);

    let totalDuration = 0;
    const newSearchList = [];
    const newVideosList = [];

    for (const key in entries) {
      totalDuration += entries[key].duration;

      newVideosList.push({
        key: Math.random().toString(),
        videoId: entries[key].videoId,
        duration: entries[key].duration,
      });
    }
    for (const key in searches) {
      newSearchList.push({
        key: Math.random().toString(),
        searchCriteria: searches[key].searchCriteria,
      });
    }

    let outputInSeconds = Math.round(totalDuration / 1000);
    const days = Math.floor(outputInSeconds / (3600 * 24));
    outputInSeconds -= days * 3600 * 24;
    const hours = Math.floor(outputInSeconds / 3600);
    outputInSeconds -= hours * 3600;
    const minutes = Math.floor(outputInSeconds / 60);
    outputInSeconds -= minutes * 60;

    const newDuration = `${days} days, ${hours} hours, ${minutes} minutes, ${outputInSeconds} seconds`;

    setDuration(newDuration);
    setVideosList(newVideosList);
    setSearchList(newSearchList);
  }, [entries]);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.duration}>
          <Text style={styles.listName}>Total Duration Watched:</Text>
          <Text style={styles.infoText}>{duration}</Text>
        </View>
        <View style={styles.lists}>
          <View style={styles.list}>
            <View style={styles.infoLine}>
              <Text style={styles.listName}>Videos watched</Text>
              <Text style={styles.infoText}>Total: {videosList.length}</Text>
            </View>
            <FlatList
              style={{ height: 200 }}
              data={videosList}
              renderItem={(data) => (
                <View
                  style={{
                    margin: 2,
                    paddingLeft: 4,
                    backgroundColor: data.index % 2 ? `white` : `lightgrey`,
                  }}
                >
                  <Text>{data.item.videoId}</Text>
                  <Text>{millisecsToString(data.item.duration)}</Text>
                </View>
              )}
            />
          </View>
          <View style={styles.list}>
            <View style={styles.infoLine}>
              <Text style={styles.listName}>Search Criteria</Text>
              <Text style={styles.infoText}>Total: {searchList.length}</Text>
            </View>
            <FlatList
              style={{ width: `100%` }}
              data={searchList}
              renderItem={(data) => (
                <View
                  style={{
                    margin: 2,
                    paddingLeft: 4,
                    backgroundColor: data.index % 2 ? `white` : `lightgrey`,
                  }}
                >
                  <Text>{data.item.searchCriteria}</Text>
                </View>
              )}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
    alignContent: `center`,
  },
  lists: {
    flexDirection: `row`,
    height: `100%`,
  },
  listName: {
    fontWeight: `bold`,
    fontSize: 18,
    textAlign: `center`,
    marginBottom: 4,
  },
  duration: {
    borderBottomWidth: 1,
    borderBottomColor: `grey`,
    paddingBottom: 15,
  },
  list: {
    height: `65%`,
    width: `50%`,
    borderColor: `grey`,
    borderWidth: 1,
  },
  infoLine: {
    borderBottomWidth: 1,
    borderBottomColor: `grey`,
    marginTop: 10,
    height: 80,
  },
  infoText: {
    fontSize: 15,
    textAlign: `center`,
  },
});
