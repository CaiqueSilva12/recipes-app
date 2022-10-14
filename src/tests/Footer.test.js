import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

describe('Testing the Footer component', () => {
  it('Test if meals and drink icon are rendered in footer', () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/profile'],
    });

    const drinkIcon = screen.getByTestId('drinks-bottom-btn');
    expect(drinkIcon).toBeInTheDocument();
    const mealsIcon = screen.getByTestId('meals-bottom-btn');
    expect(mealsIcon).toBeInTheDocument();
  });

  it('Test if clicking on the meals icon redirects', () => {
    const { history } = renderWithRouterAndRedux(<App />, {
      initialEntries: ['/profile'],
    });

    const mealsIcon = screen.getByTestId('meals-bottom-btn');
    userEvent.click(mealsIcon);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');
  });

  it('Test if clicking on the drinks icon redirects', () => {
    const { history } = renderWithRouterAndRedux(<App />, {
      initialEntries: ['/profile'],
    });

    const drinkIcon = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinkIcon);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/drinks');
  });
});
