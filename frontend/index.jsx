import React from "react";
import ReactDOM from "react-dom";
import Root from './components/root';
import configureStore from "./store/store"
import { login } from "./util/session_api_util";

document.addEventListener("DOMContentLoaded", () => {
  const store = configureStore();
  // bootstrappiung user 
  let preloadedState = undefined;
  if (window.currentUser) {
    preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: {
        id: window.currentUser.id,
      }
    };

  }


  // testing start
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.login = login
  // testing end
  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store}/>, root);
});