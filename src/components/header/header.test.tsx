import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { appStore } from '../../store/store';
import { MemoryRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Header } from './header';

const mockLoggedUser = {
  id: '1',
  name: 'User 1',
  surname: 'Surname 1',
  email: '',
  age: 30,
  visitado: [],
  probada: [],
};

jest.mock('../../hooks/use.users', () => ({
  useUsers: jest.fn(() => ({
    loggedUser: mockLoggedUser,
    currentloggedUser: mockLoggedUser,
    loadUser: mockLoggedUser,
    userStore: {
      get: mockLoggedUser,
    },
  })),
}));

describe('Header', () => {
  test('renders header component', () => {
    render(
      <Provider store={appStore}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );
  });
});
