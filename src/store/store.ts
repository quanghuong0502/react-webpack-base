import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import rootReducer from './reducers';

/* store configuration */
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat([logger]),
  devTools: process.env.NODE_ENV === 'development'
});

/* store types */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
