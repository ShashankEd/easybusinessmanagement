import thunkMiddleware from 'redux-thunk';
import {persistStore, persistReducer, REHYDRATE} from 'redux-persist';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {mapValues} from 'lodash';
import logger from 'redux-logger';
import {reducer as formReducer} from 'redux-form';
import {actionTypes} from './actionTypes';
import * as reducers from './reducers';
import storage from 'redux-persist/lib/storage';
const appReducers = {
  ...mapValues(reducers, 'reducers'),
  form: formReducer
};

const appReducer = combineReducers(appReducers);
const rootReducer = (
  state,
  action,
) => {
  if (action.type === actionTypes.CLEAR_FORM_DATA) {
    Object.keys(state).map(key => {
      if (key === 'form') {
        state[key] = null;
      }
    });
  }

  return appReducer(state, action);
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['form'], // Names of reducers which will be persisted.
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(thunkMiddleware, logger),
);
export const persistor = persistStore(store);
