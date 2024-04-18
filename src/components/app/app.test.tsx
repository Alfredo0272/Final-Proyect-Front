import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { App } from './app';
import { Header } from '../header/header';

jest.mock('../header/header');
jest.mock('../router/router');
jest.mock('../../hooks/use.users', () => ({
  useUsers: jest.fn().mockReturnValue({
    loginWithToken: jest.fn(),
  }),
}));
describe('Given App component', () => {
  describe('When we instantiate', () => {
    beforeEach(() => {
      render(<App></App>);
    });
    test('renders App with Header', () => {
      expect(Header).toHaveBeenCalled();
    });
  });
});
