
import React from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import App from './app';


const Root = ({ store }) => (
  <h1>From the root </h1>
  // <Provider store={store}>
  //   <HashRouter>
  //     <App store={store} />
  //   </HashRouter>
  // </Provider>
);

export default Root;