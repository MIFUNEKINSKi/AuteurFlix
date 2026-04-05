import React from 'react';
import { createRoot } from 'react-dom/client';
import setupStore from './store/store';
import Root from './components/root';

document.addEventListener('DOMContentLoaded', () => {
  let init;
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser },
      },
      session: { id: window.currentUser.id },
    };
    init = setupStore(preloadedState);
    delete window.currentUser;
  } else {
    init = setupStore();
  }
  const rootElement = document.getElementById('root')!;
  const root = createRoot(rootElement);
  root.render(<Root store={init.store} persistor={init.persistor} />);
});
