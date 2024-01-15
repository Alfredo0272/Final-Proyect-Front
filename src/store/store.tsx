import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/user.slice';

export const appStore = configureStore({
  reducer: { usersState: userReducer },
});
export type AppDispatch = typeof appStore.dispatch;
export type RootState = ReturnType<typeof appStore.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
