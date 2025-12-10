import { LoginUser, User } from '../../models/user.model';
import { LocalStorage } from '../../services/local.storage';
import { UsersRepo } from '../../services/users/api.repo.users';
import { appStore } from '../../store/store';
import {
  addBeerToTasteThunk,
  addPubtoVisitedThunk,
  delBeerFromTasteThunk,
  delPubFromVisitedThunk,
  loginThunk,
  loginTokenThunk,
  registerThunk,
} from './user.thunk';

describe('Given user.thunk', () => {
  describe('When executing actions', () => {
    const sharedData = {
      repo: {
        login: jest.fn().mockResolvedValue({
          token: 'TOKEN',
          user: { id: 'USER123', role: 'User' },
        }),
        loginWithToken: jest.fn().mockResolvedValue({
          token: 'TOKEN',
          user: { id: 'USER123', role: 'User' },
        }),
        registerUser: jest.fn().mockResolvedValue({}),
        addBeertoTaste: jest.fn().mockResolvedValue({}),
        delBeerFromTaste: jest.fn().mockResolvedValue({}),
        addPubtoVisited: jest.fn().mockResolvedValue({}),
        delPubFromVisited: jest.fn().mockResolvedValue({}),
      } as unknown as UsersRepo,

      userStore: {
        set: jest.fn(),
        get: jest.fn().mockReturnValue({
          token: 'TOKEN',
          id: 'USER123',
          role: 'User',
        }),
        remove: jest.fn(),
      } as unknown as LocalStorage<{
        token: string;
        id: string;
        role: string;
      }>,
    };

    const newUser = {} as Partial<User>;

    test('loginThunk should update token in store', async () => {
      const data = { ...sharedData, loginUser: {} as LoginUser };
      await appStore.dispatch(loginThunk(data));

      expect(data.repo.login).toHaveBeenCalled();
      expect(data.userStore.set).toHaveBeenCalledWith({
        token: 'TOKEN',
        id: 'USER123',
        role: 'User',
      });
    });

    test('loginTokenThunk should update token', async () => {
      const data = { ...sharedData, token: 'TOKEN' };
      await appStore.dispatch(loginTokenThunk(data));

      expect(data.repo.loginWithToken).toHaveBeenCalled();
      expect(data.userStore.set).toHaveBeenCalledWith({
        token: 'TOKEN',
        id: 'USER123',
        role: 'User',
      });
    });

    test('registerThunk should call registerUser', async () => {
      const data = { ...sharedData, newUser };
      await appStore.dispatch(registerThunk(data));

      expect(data.repo.registerUser).toHaveBeenCalledWith(newUser);
    });

    test('addBeerToTasteThunk should pass 3 args', async () => {
      const data = {
        ...sharedData,
        beer: 'BEER123',
      };

      await appStore.dispatch(addBeerToTasteThunk(data));

      expect(data.repo.addBeertoTaste).toHaveBeenCalledWith(
        'BEER123',
        'TOKEN',
        'USER123'
      );
    });

    test('delBeerFromTasteThunk should pass 3 args', async () => {
      const data = {
        ...sharedData,
        beer: 'BEER123',
      };

      await appStore.dispatch(delBeerFromTasteThunk(data));

      expect(data.repo.delBeerFromTaste).toHaveBeenCalledWith(
        'BEER123',
        'TOKEN',
        'USER123'
      );
    });

    test('addPubtoVisitedThunk should pass 3 args', async () => {
      const data = {
        ...sharedData,
        pub: 'PUB123',
      };

      await appStore.dispatch(addPubtoVisitedThunk(data));

      expect(data.repo.addPubtoVisited).toHaveBeenCalledWith(
        'PUB123',
        'TOKEN',
        'USER123'
      );
    });

    test('delPubFromVisitedThunk should pass 3 args', async () => {
      const data = {
        ...sharedData,
        pub: 'PUB123',
      };

      await appStore.dispatch(delPubFromVisitedThunk(data));

      expect(data.repo.delPubFromVisited).toHaveBeenCalledWith(
        'PUB123',
        'TOKEN',
        'USER123'
      );
    });
  });
});
