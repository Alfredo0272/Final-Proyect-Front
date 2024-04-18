import { Provider } from 'react-redux';
import { appStore } from '../../store/store';
import PubCard from './pub.card';
import { MemoryRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Pub } from '../../models/pub.model';
import userEvent from '@testing-library/user-event';

jest.mock('../../hooks/use.pubs', () => ({
  usePubs: jest.fn().mockReturnValue({
    handlePubDetails: jest.fn(),
    loadPubs: jest.fn(),
  }),
}));

jest.mock('../../services/images', () => ({
  makeImageURL: jest.fn(),
}));

describe('given the Pub card element', () => {
  describe('Pubcard element should render', () => {
    const mockPub = {
      name: 'Pub 1',
      owner: 'Address 1',
      direction: '123456789',
      taps: '5',
      pubImg: {
        publicId: 'image1',
      },
    } as unknown as Pub;

    render(
      <Provider store={appStore}>
        <Router>
          <PubCard pub={mockPub} />
        </Router>
      </Provider>
    );

    test('should render a pub card with the correct information when all pub information is provided', async () => {
      expect(screen.getByText('NAME:')).toBeInTheDocument();
      expect(screen.getByText('Pub 1')).toBeInTheDocument();
      expect(screen.getByText('OWNER:')).toBeInTheDocument();
      expect(screen.getByText('Address 1')).toBeInTheDocument();
      expect(screen.getByText('DIRECTION:')).toBeInTheDocument();
      expect(screen.getByText('123456789')).toBeInTheDocument();
      expect(screen.getByText('TAPS:')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(
        screen.getByAltText('movil pub image de Pub 1')
      ).toBeInTheDocument();
      userEvent.click(screen.getByAltText('movil pub image de Pub 1'));
    });
  });
});
