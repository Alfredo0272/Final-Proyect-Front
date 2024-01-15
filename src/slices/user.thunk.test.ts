import { LoginUser } from '../models/user.model';
import { LocalStorage } from '../services/local.storage';
import { UsersRepo } from '../services/users/api.repo.users';
import { appStore } from '../store/store';
import { loginThunk, loginTokenThunk, registerThunk } from './user.thunk';

describe('Given...', () => {
  describe('When...', () => {
    const sharedData = {
      repo: {
        login: jest.fn().mockReturnValue({
          token: '',
        }),
        loginWithToken: jest.fn().mockReturnValue({
          token: '',
        }),
      } as unknown as UsersRepo,

      userStore: {
        set: jest.fn(),
      } as unknown as LocalStorage<{
        token: string;
        id: '';
      }>,
    };

    const newUser = {
      repo: {
        login: jest.fn().mockReturnValue({
          token: '',
        }),
      } as unknown as UsersRepo,
      newUser: {},
    };

    test('Then it should dispatch loginThunk and update user store', async () => {
      const data = { ...sharedData, loginUser: {} as LoginUser };
      await appStore.dispatch(loginThunk(data));
      expect(data.repo.login).toHaveBeenCalled();
    });
    test('Then it should dispatch loginTokenThunk and update user store', async () => {
      const data = { ...sharedData, token: '' };
      await appStore.dispatch(loginTokenThunk(data));
      expect(data.repo.login).toHaveBeenCalled();
      expect(data.userStore.set).toHaveBeenCalled();
    });
    test('Then register it should be dispatched', async () => {
      const data = { ...sharedData, loginUser: {} as LoginUser };
      await appStore.dispatch(registerThunk(newUser));
      expect(data.repo.login).toHaveBeenCalled();
    });
  });
});
