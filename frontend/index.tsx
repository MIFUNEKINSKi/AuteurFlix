import React from 'react';
import { createRoot } from 'react-dom/client';
import setupStore from './store/store';
import Root from './components/root';

// Pulled into the bundle by MiniCssExtractPlugin -> /application.css
// (Bypasses the Rails Sprockets pipeline so SCSS rebuilds on every webpack run.)
import '../app/assets/stylesheets/application.scss';

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
