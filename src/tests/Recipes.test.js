import userEvent from '@testing-library/user-event';
import { cleanup, screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';
import chickenMeals from '../../cypress/mocks/chickenMeals';
import mealCategories from '../../cypress/mocks/mealCategories';
import cocktailDrinks from '../../cypress/mocks/cocktailDrinks';
import drinkCategories from '../../cypress/mocks/drinkCategories';

describe('Testing the Recipes page', () => {
  beforeEach(() => {
    cleanup();
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(chickenMeals)
        .mockResolvedValueOnce(mealCategories)
        .mockResolvedValue(chickenMeals),
    });
  });

  const searchIconTestId = 'search-top-btn';
  const searchBtnTestId = 'exec-search-btn';

  const singleMeal = { meals: [{
    strMeal: 'Brown Stew Chicken',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/sypxpx1515365095.jpg',
    idMeal: '52940',
  }] };

  it('test if 12 recipes are rendered correctly', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    await waitFor(() => {
      const recipes = screen.getAllByTestId(/\S-recipe-card/i);
      expect(recipes).toHaveLength(12);
    });
  });

  it('test if the search by ingredient works correctly', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const searchIcon = screen.getByTestId(searchIconTestId);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const searchBtn = screen.getByTestId(searchBtnTestId);

    userEvent.type(searchInput, 'chicken');
    userEvent.click(ingredientRadio);
    userEvent.click(searchBtn);

    await waitFor(() => {
      const recipes = screen.getAllByTestId(/\S-recipe-card/i);
      expect(recipes).toHaveLength(12);
    });
  });

  it('test if the alert is called when the api result is wrong', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(cocktailDrinks)
        .mockResolvedValueOnce(drinkCategories)
        .mockResolvedValue(''),
    });
    global.alert = jest.fn();
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    const searchIcon = screen.getByTestId(searchIconTestId);
    userEvent.click(searchIcon);
    const searchBtn = screen.getByTestId(searchBtnTestId);
    userEvent.click(searchBtn);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
  });

  it('test if it redirects to product details when the results length is 1', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(singleMeal),
    });
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const searchIcon = screen.getByTestId(searchIconTestId);
    userEvent.click(searchIcon);
    const searchBtn = screen.getByTestId(searchBtnTestId);
    userEvent.click(searchBtn);

    await waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/meals/52940');
    });
  });
});
