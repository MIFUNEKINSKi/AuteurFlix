import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import sessionReducer from './sessionSlice';
import entitiesReducer from './entitiesSlice';
import errorsReducer from './errorsSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['entities', 'session'],
};

const rootReducer = combineReducers({
  entities: entitiesReducer,
  session: sessionReducer,
  errors: errorsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const setupStore = (preloadedState?: any) => {
  const store = configureStore({
    reducer: persistedReducer,
    preloadedState: preloadedState as any,
    middleware: (getDefaultMiddleware) => {
      const middleware = getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      });
      if (process.env.NODE_ENV !== 'production') {
        const { createLogger } = require('redux-logger');
        return middleware.concat(createLogger({ collapsed: true }));
      }
      return middleware;
    },
  });
  const persistor = persistStore(store);
  return { store, persistor };
};

export type AppDispatch = ReturnType<typeof setupStore>['store']['dispatch'];

export default setupStore;
