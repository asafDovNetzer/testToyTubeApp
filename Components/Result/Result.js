import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { presentNumber } from "../../Helpers/HelperFunctions";

export default Result = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => props.selectHandler(props.info)}
    >
      <View style={styles.result}>
        <View>
          <Image
            source={{
              uri: props.info.img.url,
            }}
            style={{
              height: props.info.img.height,
              width: props.info.img.width,
            }}
            resizeMode="cover"
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.title}>{props.info.title}</Text>
          <ScrollView style={{ height: 30 }}>
            <Text style={styles.desc}>{props.info.description}</Text>
          </ScrollView>
          <Text>
            Total Votes: {presentNumber(props.info.likes + props.info.dislikes)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  result: {
    marginBottom: 10,
    width: `100%`,
    flexDirection: `row`,
    borderColor: `lightgrey`,
    borderWidth: 1,
    borderRadius: 2,
    padding: 8,
  },
  desc: {},
  title: {
    fontWeight: `bold`,
  },
  info: {
    paddingHorizontal: 5,
    width: `65%`,
  },
});
