import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { UserButtons } from './user.button';
import { appStore } from '../../store/store';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn().mockReturnValue(jest.fn()),
  useSelector: jest
    .fn()
    .mockReturnValue({ loggedUser: { id: '1', role: 'Admin' } }),
}));

describe('UserButtons Component and logged User', () => {
  test('should render buttons when user is logged in and on home page', () => {
    const pathname = '/';
    render(
      <Provider store={appStore}>
        <Router initialEntries={[pathname]}>
          <UserButtons />
        </Router>
      </Provider>
    );

    expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Registre Pub' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Beers' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'User' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pubs' })).toBeInTheDocument();
  });
});
