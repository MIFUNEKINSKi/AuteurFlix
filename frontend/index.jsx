import React from "react";
import ReactDOM from "react-dom";
import Root from './components/root';
import configureStore from "./store/store"
import { login } from "./util/session_api_util";

document.addEventListener("DOMContentLoaded", () => {
  const store = configureStore();
  // testing start
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.login = login
  // testing end
  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store}/>, root);
});