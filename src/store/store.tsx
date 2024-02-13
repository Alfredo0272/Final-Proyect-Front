import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/user/user.slice';
import beersReducer from '../slices/beer/beer.slice';
import pubsReducer from '../slices/pubs/pub.slice';

export const appStore = configureStore({
  reducer: {
    beerState: beersReducer,
    usersState: userReducer,
    pubState: pubsReducer,
  },
});

export type AppDispatch = typeof appStore.dispatch;
export type RootState = ReturnType<typeof appStore.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
