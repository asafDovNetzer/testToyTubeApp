import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { signUpOrIn } from "../../Store/Actions";

export default function UserModal(props) {
  const [email, setEmail] = React.useState(``);
  const [isLoading, setIsLoading] = React.useState(false);
  const [password, setPassword] = React.useState(``);
  const [authMethod, setAuthMethod] = React.useState(`login`);

  const dispatch = useDispatch();
  const authErrorMessage = useSelector((state) => state.authErrorMessage);

  const handleAuth = () => {
    setIsLoading(true);

    if (authMethod == `signup`) {
      dispatch(signUpOrIn(email, password, `signUp`));
      setIsLoading(false);
    } else {
      dispatch(signUpOrIn(email, password, `signInWithPassword`));
      setIsLoading(false);
    }
  };

  const handleSwitch = () => {
    const newAuthMethod = authMethod === "login" ? `signup` : `login`;
    setAuthMethod(newAuthMethod);
  };

  let switchLabel = `SIGN UP`;
  if (authMethod === `signup`) switchLabel = `LOGIN`;

  return (
    <Modal visible={true}>
      <View style={styles.container}>
        <Text style={{ fontSize: 24 }}>Welcome</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(input) => setEmail(input)}
            placeholder="You Email..."
            autoComplete="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            value={password}
            secureTextEntry
            autoComplete="password"
            keyboardType="default"
            onChangeText={(input) => setPassword(input)}
            placeholder="You password..."
            textContentType="password"
          />
        </View>
        <View style={styles.buttonPanel}>
          {isLoading ? (
            <ActivityIndicator size="small" color="black" />
          ) : (
            <Button
              title={authMethod === `signup` ? `SIGN UP` : `LOGIN`}
              onPress={handleAuth}
            />
          )}
          <Text
            style={{
              textAlign: `center`,
              fontSize: 15,
              marginTop: 10,
              color: `red`,
            }}
          >
            {authErrorMessage || ``}
          </Text>
          <TouchableOpacity style={styles.switchButton} onPress={handleSwitch}>
            <Text style={{ textAlign: `center`, fontSize: 16 }}>
              {`switch to ${switchLabel}`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
    justifyContent: `space-between`,
    alignItems: `center`,
  },
  message: {
    fontWeight: `bold`,
    fontSize: 20,
    color: `green`,
    textAlign: `center`,
  },
  form: {
    width: `100%`,
  },
  switchButton: {
    width: `100%`,
    marginTop: 25,
  },
  input: {
    marginVertical: 10,
    borderColor: `black`,
    borderWidth: 1,
    padding: 10,
    width: `100%`,
  },
  buttonPanel: {
    // flexDirection: `row`,
    backgroundColor: `white`,
    width: `100%`,
    justifyContent: `space-around`,
  },
});
