import React from "react";
import SearchScreen from "./Screens/SearchScreen";
import Toolbar from "./Components/Toolbar/Toolbar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VideoScreen from "./Components/VideoScreen/VideoScreen";
import Stats from "./Screens/StatsScreen";
import { ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getLocalStorage } from "./Store/Actions";
import UserModal from "./Components/UserModal/UserModal";

const Stack = createNativeStackNavigator();

export default function Navigator() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user);

  React.useEffect(() => {
    dispatch(getLocalStorage());
  }, [dispatch]);

  if (userId === undefined)
    return <ActivityIndicator size="large" color="black" />;

  //   console.log(userId, `nav userid`);

  return (
    <NavigationContainer>
      <Toolbar />
      <Stack.Navigator>
        {!!userId ? (
          <>
            <Stack.Screen name="Home" component={SearchScreen} />
            <Stack.Screen name="Video" component={VideoScreen} />
            <Stack.Screen name="Stats" component={Stats} />
          </>
        ) : (
          <>
            <Stack.Screen name="AuthScreen" component={UserModal} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
