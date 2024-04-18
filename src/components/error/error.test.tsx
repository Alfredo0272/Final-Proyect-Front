import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorPage from './error';

describe('Given ErrorPage component', () => {
  describe('When we instantiate', () => {
    render(<ErrorPage></ErrorPage>);

    test('It should be in the document', () => {
      const element = screen.getByText(/404/i);
      expect(element).toBeInTheDocument();
    });
  });
});
