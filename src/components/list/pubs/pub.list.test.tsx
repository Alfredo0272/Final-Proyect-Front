import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { appStore } from '../../../store/store';
import { MemoryRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { usePubs } from '../../../hooks/use.pubs';
import PubList from './pub.list';

jest.mock('../../../hooks/use.pubs', () => ({
  usePubs: jest.fn().mockReturnValue({
    loadPubs: jest.fn(),
    pubs: [],
  }),
}));

test('should load pubs on mount', () => {
  render(
    <Provider store={appStore}>
      <Router>
        <PubList />
      </Router>
    </Provider>
  );

  const pubList = screen.getByRole('list');
  expect(pubList).toBeInTheDocument();
  expect(usePubs().loadPubs).toHaveBeenCalled();
  expect(screen.getByText('Pubs')).toBeInTheDocument();
});
