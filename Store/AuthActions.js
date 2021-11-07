import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_API_KEY } from "../Settings";

export const getLocalStorage = () => {
  return async (dispatch) => {
    const userData = await AsyncStorage.getItem(`userData`);

    if (!userData) {
      dispatch(unauthenticate());
      return;
    }

    const { token, userId, expirationDate } = JSON.parse(userData);

    if (expirationDate <= Date.now() || !token || !userId) {
      dispatch(unauthenticate());
      return;
    }

    // console.log(`stilll vallid`);

    dispatch(authenticate(userId, token));
  };
};

export const signout = () => {
  return (dispatch) => {
    AsyncStorage.removeItem(`userData`);
    dispatch(unauthenticate());
  };
};

const unauthenticate = () => {
  return {
    type: `SIGN_OUT`,
  };
};

export const signUpOrIn = (email, password, method) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:${method}?key=${AUTH_API_KEY}
        `,
      {
        method: `POST`,
        headers: {
          "Content-Type": `application/json`,
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    const responseData = await response.json();
    if (responseData.error) {
      dispatch(setErrorMessage(responseData.error.message));
      return;
    }

    dispatch(authenticate(responseData.localId, responseData.idToken));

    const expirationDate = Date.now() + parseInt(responseData.expiresIn) * 1000;

    saveDataToStorage(
      responseData.idToken,
      responseData.localId,
      expirationDate
    );
  };
};

const setErrorMessage = (message) => {
  return {
    type: `SET_ERROR_MESSAGE`,
    message: message,
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    `userData`,
    JSON.stringify({
      token: token,
      userId: userId,
      expirationDate: expirationDate,
    })
  );
};
export const authenticate = (userId, token) => {
  return {
    type: `LOGIN`,
    token: token,
    userId: userId,
  };
};
