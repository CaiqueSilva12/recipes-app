import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';
import { readKey, USER } from '../services/localStorage';

describe('Testing the Login page', () => {
  const wrongEmail = 'wrongemail.com';
  const wrongPassword = '123456';
  const correctEmail = 'correct@email.com';
  const correctPassword = '1234567';

  beforeEach(() => {
    // mockar o localStorage
    cleanup();
    localStorage.clear();
  });

  it('Test if the inputs work correctly', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByLabelText(/E-mail/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginBtn = screen.getByRole('button');

    userEvent.type(emailInput, wrongEmail);
    userEvent.type(passwordInput, wrongPassword);

    expect(loginBtn).toBeDisabled();

    userEvent.type(emailInput, correctEmail);
    userEvent.type(passwordInput, correctPassword);

    expect(loginBtn).not.toBeDisabled();
  });

  it('Test if clicking the button saves the email in localStorage and redirects to the page "/meals"', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByLabelText(/E-mail/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginBtn = screen.getByRole('button');

    userEvent.type(emailInput, correctEmail);
    userEvent.type(passwordInput, correctPassword);
    userEvent.click(loginBtn);

    await waitFor(() => {
      const { location: { pathname } } = history;
      const savedEmail = readKey(USER);

      expect(pathname).toBe('/meals');
      expect(savedEmail.email).toBe(correctEmail);
    });
  });
});
