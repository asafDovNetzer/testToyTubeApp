import React from "react";
import { StyleSheet, View, TextInput, FlatList, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Result from "../Components/Result/Result";
import { search, setVideo } from "../Store/Actions";
import Button from "../Components/UI/Button";

export default SearchScreen = ({ navigation }) => {
  const [input, setInput] = React.useState(``);
  const results = useSelector((state) => state.results);
  const dispatch = useDispatch();

  const handleChange = (currentInput) => {
    setInput(currentInput);
  };

  const handleSearch = () => {
    dispatch(search(input));
  };

  const playVideo = (videoInfo) => {
    dispatch(setVideo(videoInfo));
    navigation.navigate(`Video`);
  };

  const clearInput = () => {
    setInput(``);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: `row`,
          justifyContent: `space-between`,
          width: `90%`,
        }}
      >
        <TextInput
          value={input}
          placeholder="Your search..."
          style={styles.input}
          onChangeText={handleChange}
        />
        <Button
          title={`search`}
          onPress={handleSearch}
          backgroundColor="#6b1853"
          color="white"
          height={50}
          width={90}
        />
      </View>
      <Button
        title={`clear search`}
        onPress={clearInput}
        height={30}
        fontSize={16}
      />
      <View style={styles.box}>
        {!results.length ? <Text>No results found...</Text> : null}
        <FlatList
          style={{ width: `100%`, height: `90%` }}
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={(data) => (
            <Result info={data.item} selectHandler={playVideo} />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  box: {
    width: `100%`,
    padding: 20,
  },
  input: {
    borderColor: `black`,
    borderWidth: 1,
    padding: 10,
    width: `80%`,
  },
  clear: {
    marginTop: 10,
  },
});
