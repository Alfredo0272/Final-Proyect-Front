import Footer from './footer';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { appStore } from '../../store/store';
import { MemoryRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('Given Footer component', () => {
  describe('When we Render it', () => {
    render(
      <Provider store={appStore}>
        <Router>
          <Footer />
        </Router>
      </Provider>
    );

    test('Then it should be...', () => {
      const element = screen.getByRole('contentinfo');
      expect(element).toBeInTheDocument();
    });
  });
});
