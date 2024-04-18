import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { appStore } from '../../store/store';
import CreateBeer from './beers.form';
import userEvent from '@testing-library/user-event';
import { useBeers } from '../../hooks/use.beers';

jest.mock('../../hooks/use.beers', () => ({
  useBeers: jest.fn().mockReturnValue({
    createBeer: jest.fn(),
    loadBeerById: jest.fn(),
  }),
}));

describe('Given the createBeer component', () => {
  describe('When create form is rendered', () => {
    beforeEach(() => {
      render(
        <Provider store={appStore}>
          <Router>
            <CreateBeer />
          </Router>
        </Provider>
      );
    });
    test('Then the handleSubmit should be called on form submit', async () => {
      const form = screen.getByRole('form');
      const button = screen.getByRole('button');
      const inputs = screen.getAllByRole('textbox');
      await userEvent.type(inputs[0], 'pepe');
      await userEvent.type(inputs[1], 'pepez');
      await userEvent.type(inputs[2], '12345');
      await userEvent.type(inputs[3], 'pepe');
      userEvent.click(button);
      await fireEvent.submit(form);
      expect(useBeers().createBeer).toHaveBeenCalled();
    });
  });
});
