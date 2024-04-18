import { MemoryRouter as Router } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useUsers } from '../../hooks/use.users';
import Swal from 'sweetalert2';
import { appStore } from '../../store/store';
import Register from './register';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

jest.mock('../../hooks/use.users', () => ({
  useUsers: jest.fn().mockReturnValue({
    register: jest.fn(),
  }),
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

describe('Given the Register component', () => {
  describe('When register form is rendered', () => {
    beforeEach(() => {
      render(
        <Provider store={appStore}>
          <Router>
            <Register />
          </Router>
        </Provider>
      );
    });
    test('Then the handleRegisterUser should be called on form submit', async () => {
      const form = screen.getByRole('form');
      const button = screen.getByRole('button');
      const inputs = screen.getAllByRole('textbox');
      await userEvent.type(inputs[0], 'pepe');
      await userEvent.type(inputs[1], 'pepez');
      await userEvent.type(inputs[2], '12345');
      await userEvent.type(inputs[3], 'pepe');
      await userEvent.type(inputs[4], 'pepe@pepe');
      userEvent.click(button);
      await fireEvent.submit(form);
      expect(useUsers().register).toHaveBeenCalled();
    });
    test('Then the handleRegisterUser should be called on form submit', async () => {
      const form = screen.getByRole('form');
      const button = screen.getByRole('button');
      userEvent.click(button);
      await fireEvent.submit(form);
      expect(Swal.fire).toHaveBeenCalled();
    });
    test('Then the Sign Up button should be in the document', () => {
      const signUpButton = screen.getByRole('button');
      expect(signUpButton).toBeInTheDocument();
    });
  });
});
