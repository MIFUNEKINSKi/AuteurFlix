import React from "react";
import { createRoot } from 'react-dom/client';
import configureStore from './store/store';
import Root from './components/root';
// import "core-js/stable";
import "regenerator-runtime/runtime";

document.addEventListener('DOMContentLoaded', () => {
  let init;
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id }
    };
    init = configureStore(preloadedState);

    delete window.currentUser;
  } else {
    init = configureStore();

  }
  const container = document.getElementById('root');
  const root = createRoot(container);
  root.render(<Root store={init.store} persistor={init.persistor} />);
  // gr

});

