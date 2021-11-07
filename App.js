import React from "react";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./Store/Reducer";
import Thunk from "redux-thunk";
import Navigator from "./Navigator";

const store = createStore(reducer, applyMiddleware(Thunk));

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
