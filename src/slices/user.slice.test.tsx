import { User } from '../models/user.model';
import userSlice, { logout } from './user.slice';
import usersReducer, { UserState } from './user.slice';
describe('Given the users slice reducer', () => {
  describe(' When users/login/pending action is dispacth  ', () => {
    test('Then the new state will be returned ', () => {
      const action = {
        type: 'login/fulfilled',
        payload: { user: 'test user', token: 'token' },
      };
      const state: UserState = {} as UserState;
      const result = usersReducer(state, action);
      expect(result.loggedUser).toBe('test user');
      expect(result.token).toBe('token');
    });
    test('Then the new state will be returned ', () => {
      const action = {
        type: 'loginWithToken/fulfilled',
        payload: { user: 'test user', token: 'token' },
      };
      const state: UserState = {} as UserState;
      const result = usersReducer(state, action);
      expect(result.loggedUser).toBe('test user');
      expect(result.token).toBe('token');
    });
    test('Then the new state will be returned ', () => {
      const action = { type: 'login/pending' };
      const state: UserState = {} as UserState;
      const result = usersReducer(state, action);
      expect(result.loginLoadState).toBe('logging');
    });
    test('Then the new state will be returned ', () => {
      const action = { type: 'login/rejected' };
      const state: UserState = {} as UserState;
      const result = usersReducer(state, action);
      expect(result.loginLoadState).toBe('error');
    });
    test('should set loggedUser to the payload when setCurrentUser action is dispatched', () => {
      const state: UserState = {} as UserState;
      const payload = {
        id: '1',
        name: 'John',
        surname: 'Doe',
        age: 25,
        userName: 'johndoe',
        probada: [],
        visitado: [],
        role: 'User',
      };
      const action = { type: 'user/setCurrentUser', payload };
      const result = userSlice(state, action);
      expect(result.loggedUser).toEqual(payload);
    });
  });
  describe(' When users/logout action is dispacth  ', () => {
    test('Then the new state will be returned ', () => {
      const state: UserState = {
        loggedUser: {} as unknown as User,
        loginLoadState: 'logged',
        token: 'token',
      };
      const expectedState: UserState = {
        loggedUser: null,
        loginLoadState: 'logged',
        token: '',
      };
      const result = userSlice(state, logout());
      expect(result).toEqual(expectedState);
    });
  });
});
