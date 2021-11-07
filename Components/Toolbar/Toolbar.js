import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { signout, getAllData } from "../../Store/Actions";
import { ADMIN_ID } from "../../Settings";

export default Toolbar = () => {
  const [isAdmin, setIsAdmin] = React.useState(false);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user);
  const navigation = useNavigation();

  React.useEffect(() => {
    // console.log(userId, `userId`);

    if (userId === ADMIN_ID) {
      setIsAdmin(true);
      dispatch(getAllData());
      // console.log(`isAdmin!!`);
    } else {
      setIsAdmin(false);
    }
  }, [userId]);

  console.log(isAdmin, `isAdmin`);

  return (
    <View style={styles.toolbar}>
      <Text style={styles.title}>APP-NAME</Text>
      {isAdmin ? (
        <TouchableOpacity onPress={() => navigation.navigate(`Stats`)}>
          <View>
            <Text style={styles.signout}>Stats</Text>
          </View>
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity
        onPress={() => {
          Alert.alert(`Are you sure?`, ``, [
            {
              text: "Cancel",
              onPress: () => {},
              style: "cancel",
            },
            {
              text: "YES",
              onPress: () => {
                dispatch(signout());
              },
              style: `destructive`,
            },
          ]);
        }}
      >
        <View>
          <Text style={styles.signout}>Sign Out</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: `#932f6d`,
    width: `100%`,
    height: 90,
    paddingHorizontal: 10,
    paddingTop: 36,
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignContent: `center`,
  },
  title: {
    color: `white`,
    fontSize: 22,
  },
  signout: {
    marginTop: 6,
    color: `white`,
    fontSize: 18,
  },
});
