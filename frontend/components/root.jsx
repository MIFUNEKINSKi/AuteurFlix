
import React from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import App from './app';
import { PersistGate } from 'redux-persist/es/integration/react';



const Root = ({ store, persistor }) => (
  <Provider store={store}>
    <persistor> 
      <HashRouter>
        <App />
      </HashRouter>
    </persistor>
  </Provider>
);

export default Root;

