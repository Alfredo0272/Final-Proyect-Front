import { appStore } from '../store/store';
import { useUsers } from './use.users';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import { LocalStorage } from '../services/local.storage';
import { UsersRepo } from '../services/users/api.repo.users';
import { LoginUser, User } from '../models/user.model';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn().mockReturnValue(jest.fn(() => Promise.resolve())),
}));

const mockLoginUser = {} as LoginUser;
const mockNewUser = {} as unknown as Partial<User>;

describe('Given useUsers Hook', () => {
  const TestComponent = () => {
    const {
      logoutUser,
      login,
      loginWithToken,
      register,
      makeLogOut,
      addBeer,
      delBeer,
      addPub,
      delPub,
    } = useUsers();

    return (
      <>
        <button onClick={() => makeLogOut()}></button>
        <button onClick={() => login(mockLoginUser)}> </button>
        <button onClick={() => loginWithToken()}></button>
        <button onClick={() => register(mockNewUser)}> </button>
        <button onClick={() => logoutUser()}> </button>
        <button onClick={() => addBeer('beer', 'token')}></button>
        <button onClick={() => delBeer('beer', 'token')}></button>
        <button onClick={() => addPub('pub', 'token')}></button>
        <button onClick={() => delPub('pub', 'token')}></button>
      </>
    );
  };

  let elements: HTMLElement[];

  beforeEach(() => {
    render(
      <Provider store={appStore}>
        <TestComponent></TestComponent>
      </Provider>
    );
    elements = screen.getAllByRole('button');
  });

  describe('When we click button makeLogOut', () => {
    test('Then the dispatch should have been called', async () => {
      await userEvent.click(elements[0]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });
  describe('When we click button login', () => {
    test('Then the dispatch should have been called', async () => {
      await userEvent.click(elements[1]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });
  describe('When we click button loginWithToken', () => {
    test('Then the dispatch should have been called', async () => {
      LocalStorage.prototype.get = jest.fn().mockReturnValue('test');
      await userEvent.click(elements[2]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });
  describe('When we click button register ', () => {
    test('Then the dispatch should have been called', async () => {
      UsersRepo.prototype.registerUser = jest.fn();
      await userEvent.click(elements[3]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });
  describe('When we click button logoutUser ', () => {
    test('Then the dispatch should have been called', async () => {
      await userEvent.click(elements[4]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });
  describe('When we click button addBeer ', () => {
    test('Then the dispatch should have been called', async () => {
      await userEvent.click(elements[5]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });
  describe('When we click button delBeer ', () => {
    test('Then the dispatch should have been called', async () => {
      await userEvent.click(elements[6]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });
  describe('When we click button addPub ', () => {
    test('Then the dispatch should have been called', async () => {
      await userEvent.click(elements[7]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });
  describe('When we click button delPub ', () => {
    test('Then the dispatch should have been called', async () => {
      await userEvent.click(elements[8]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });
});
