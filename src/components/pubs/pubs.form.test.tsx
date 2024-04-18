import { usePubs } from '../../hooks/use.pubs';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CreatePubs from './pubs.form';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { appStore } from '../../store/store';
import userEvent from '@testing-library/user-event';

jest.mock('../../hooks/use.pubs', () => ({
  usePubs: jest.fn().mockReturnValue({
    createPub: jest.fn(),
  }),
}));

describe('Given CreatePubs component', () => {
  describe('When we instantiate', () => {
    beforeEach(() => {
      render(
        <Provider store={appStore}>
          <Router>
            <CreatePubs />
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
      userEvent.click(button);
      await fireEvent.submit(form);
      expect(usePubs().createPub).toHaveBeenCalled();
    });
  });
});
