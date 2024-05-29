import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import Login from './home';
import { appStore } from '../../store/store';
import { useUsers } from '../../hooks/use.users';
import userEvent from '@testing-library/user-event';
import Swal from 'sweetalert2';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

jest.mock('../../hooks/use.users', () => ({
  useUsers: jest.fn().mockReturnValue({
    login: jest.fn(),
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
            <Login />
          </Router>
        </Provider>
      );
    });

    test('Then the handleLoginUser function should be called on form submit', async () => {
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const button = screen.getByRole('button', { name: /sign in/i });

      await userEvent.type(emailInput, 'pepe@pepe');
      await userEvent.type(passwordInput, '12345');
      fireEvent.click(button);
      expect(useUsers().login).toHaveBeenCalled();
    });
    test('Then the handleRegisterUser should be called on form submit', async () => {
      const form = screen.getByRole('form');
      const button = screen.getByRole('button');
      userEvent.click(button);
      await fireEvent.submit(form);
      expect(Swal.fire).toHaveBeenCalled();
    });
    test("Then the 'Send' button should be in the form", async () => {
      const signUpButton = screen.getByRole('button');
      expect(signUpButton).toBeInTheDocument();
    });
  });
});
