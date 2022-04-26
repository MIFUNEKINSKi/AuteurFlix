import React from "react";
import ReactDOM from "react-dom";
import Root from './components/root';
import configureStore from "./store/store"
import { login } from "./util/session_api_util";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  // const store = configureStore();
  ReactDOM.render(<Root/>, root);
  window.login = login
});