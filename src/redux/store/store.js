import { createStore } from 'redux';

import { reducers } from '../reducers/';

import { persistReducer, persistStore } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const configureStore = () => {
  const store = createStore(persistedReducer);

  const persistor = persistStore(store);

  return { store, persistor };
};

export default configureStore;
