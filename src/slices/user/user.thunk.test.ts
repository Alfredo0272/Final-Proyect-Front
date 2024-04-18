import { LoginUser, User } from '../../models/user.model';
import { LocalStorage } from '../../services/local.storage';
import { UsersRepo } from '../../services/users/api.repo.users';
import { appStore } from '../../store/store';
import {
  addBeerToTasteThunk,
  addPubtoVisitedThunk,
  delBeerFromTasteThunk,
  delPubtoVisitedThunk,
  loginThunk,
  loginTokenThunk,
  registerThunk,
} from './user.thunk';

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
        registerUser: jest.fn().mockReturnValue({}),
        addBeertoTaste: jest.fn().mockResolvedValue({}),
        delBeerFromTaste: jest.fn().mockResolvedValue({}),
        addPubtoVisited: jest.fn().mockResolvedValue({}),
        delPubtoVisited: jest.fn().mockResolvedValue({}),
      } as unknown as UsersRepo,

      userStore: {
        set: jest.fn(),
      } as unknown as LocalStorage<{
        token: '';
      }>,
    };

    const newUser = {} as unknown as Partial<User>;
    const beer = '';
    const token = '';
    const pub = '';

    test('Then it should dispatch loginThunk and update user store', async () => {
      const data = { ...sharedData, loginUser: {} as LoginUser };
      await appStore.dispatch(loginThunk(data));
      expect(data.repo.login).toHaveBeenCalled();
      expect(data.userStore.set).toHaveBeenCalledWith({ token: '' });
    });
    test('Then it should dispatch loginTokenThunk and update user store', async () => {
      const data = { ...sharedData, token: '' };
      await appStore.dispatch(loginTokenThunk(data));
      expect(data.repo.login).toHaveBeenCalled();
      expect(data.userStore.set).toHaveBeenCalledWith({ token: '' });
    });
    test('Then register it should be dispatched', async () => {
      const data = { ...sharedData, newUser };
      await appStore.dispatch(registerThunk(data));
      expect(data.repo.registerUser).toHaveBeenCalled();
    });
    test('Then add beer should.. ', async () => {
      const userStore = {
        get: jest.fn().mockReturnValue({ token }),
      } as unknown as LocalStorage<{ token: string }>;
      const data = { ...sharedData, beer, userStore };
      await appStore.dispatch(addBeerToTasteThunk(data));
      expect(data.repo.addBeertoTaste).toHaveBeenCalledWith('', '');
    });
    test('Then dell beer should.. ', async () => {
      const userStore = {
        get: jest.fn().mockReturnValue({ token }),
      } as unknown as LocalStorage<{ token: string }>;
      const data = { ...sharedData, beer, userStore };
      await appStore.dispatch(delBeerFromTasteThunk(data));
      expect(data.repo.delBeerFromTaste).toHaveBeenCalled();
    });

    test('Then add pub should.. ', async () => {
      const userStore = {
        get: jest.fn().mockReturnValue({ token }),
      } as unknown as LocalStorage<{ token: string }>;
      const data = { ...sharedData, pub, userStore };
      await appStore.dispatch(addPubtoVisitedThunk(data));
      expect(data.repo.addPubtoVisited).toHaveBeenCalledWith('', '');
    });
    test('Then del pub should.. ', async () => {
      const userStore = {
        get: jest.fn().mockReturnValue({ token }),
      } as unknown as LocalStorage<{ token: string }>;
      const data = { ...sharedData, pub, userStore };
      await appStore.dispatch(delPubtoVisitedThunk(data));
      expect(data.repo.delPubtoVisited).toHaveBeenCalled();
    });
  });
});
