import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { appStore } from '../../store/store';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import UserDetails from './user.details';

const mockPub = {
  id: '1',
  name: 'Pub 1',
  owner: 'Owner 1',
  direction: 'Direction 1',
  taps: 5,
  logo: { publicId: 'image1' },
};
const mockBeer = {
  id: '1',
  name: 'Beer 1',
  brewer: 'Brewer 1',
  style: 'Style 1',
  alcohol: '5%',
  beerImg: { publicId: 'image1' },
};
const mockLoggedUser = {
  id: '1',
  name: 'User 1',
  surname: 'Surname 1',
  email: '',
  age: 30,
  visitado: [mockPub],
  probada: [mockBeer],
};

const mockLoadPubs = jest.fn();
const mockLoadBeers = jest.fn();

jest.mock('../../hooks/use.users', () => ({
  useUsers: jest.fn(() => ({
    loggedUser: mockLoggedUser,
    loadUser: mockLoggedUser,
    userStore: {
      get: mockLoggedUser,
    },
  })),
}));

jest.mock('../../hooks/use.pubs', () => ({
  usePubs: jest.fn(() => ({
    loadPubs: mockLoadPubs,
  })),
}));

jest.mock('../../hooks/use.beers', () => ({
  useBeers: jest.fn(() => ({
    loadBeer: mockLoadBeers,
  })),
}));

describe('Given User Details Component', () => {
  test('renders correctly', () => {
    render(
      <Router>
        <Provider store={appStore}>
          <UserDetails />
        </Provider>
      </Router>
    );
  });

  test('should call loadBeer', () => {
    render(
      <Router>
        <Provider store={appStore}>
          <UserDetails />
        </Provider>
      </Router>
    );
    expect(mockLoadBeers).toHaveBeenCalled();
  });

  test('should call loadPubs', () => {
    render(
      <Router>
        <Provider store={appStore}>
          <UserDetails />
        </Provider>
      </Router>
    );
    expect(mockLoadPubs).toHaveBeenCalled();
  });
  test('beers should be rendered', () => {
    render(
      <Router>
        <Provider store={appStore}>
          <UserDetails />
        </Provider>
      </Router>
    );
    expect(screen.getByText('Beer 1')).toBeInTheDocument();
  });
});
