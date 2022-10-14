import userEvent from '@testing-library/user-event';
import { cleanup, screen, waitFor } from '@testing-library/react';
import renderWithRouter from './helpers/renderWith';
import App from '../App';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';
import meals from '../../cypress/mocks/meals';
import { IN_PROGRESS_RECIPES } from '../services/localStorage';

describe('Testing the Recipe Details page', () => {
  const arrabiataPath = '/drinks/178319';
  beforeEach(() => {
    localStorage.clear();
    cleanup();
  });
  it('clicking on the "Start Recipe" button redirects the application', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals/52771'] });
    const startRecipeBtn = screen.getByTestId('start-recipe-btn');
    userEvent.click(startRecipeBtn);
    await waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/meals/52771/in-progress');
    });
  });
  it('test if the button have the text "Continue Recipe" when the recipe is already saved', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });
    localStorage.setItem(IN_PROGRESS_RECIPES, JSON.stringify({
      drinks: { id: '178319' },
      meals: {},
    }));
    renderWithRouter(<App />, { initialEntries: [arrabiataPath] });
    const startRecipeBtn = screen.getByTestId('start-recipe-btn');
    expect(startRecipeBtn).toHaveTextContent('Continue Recipe');
  });
  it('test if renders the sugestions correctly', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(oneDrink)
        .mockResolvedValueOnce(meals),
    });
    renderWithRouter(<App />, { initialEntries: [arrabiataPath] });
    const sugestions = screen.getAllByTestId(/\D-recommendation-card/i);
    expect(sugestions).toHaveLenght(6);
  });
  it('test if the buttons work correctly', () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(oneDrink)
        .mockResolvedValueOnce(meals),
    });
    renderWithRouter(<App />, { initialEntries: [arrabiataPath] });
    const copyBtn = screen.getByTestId('share-btn');
    const favoriteBtn = screen.getByTestId('favorite-btn');
    userEvent.click(copyBtn);
    userEvent.click(favoriteBtn);
  });
});
