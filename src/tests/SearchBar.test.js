import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWith';
import App from '../App';
import mealCategories from '../../cypress/mocks/mealCategories';

describe('Testing the SearchBar component', () => {
  const searchTestId = 'search-input';
  const searchIconTestId = 'search-top-btn';
  const firstLetterStr = 'First letter';
  const mockedBacon = {
    meals: [
      {
        idMeal: 52895,
        strMeal: 'English Breakfast',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/utxryw1511721587.jpg',
      },
      {
        idMeal: 52995,
        strMeal: 'Full English Breakfast',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/utxryw999511721589.jpg',
      },
    ],
  };
  it('Testing if the search input, search options and the search button are rendered', () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mockedBacon)
        .mockResolvedValueOnce(mealCategories)
        .mockResolvedValue(mockedBacon),
    });
    renderWithRouter(<App />, {
      initialEntries: ['/meals'],
    });
    const searchIcon = screen.getByTestId(searchIconTestId);
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon);
    const searchBar = screen.getByTestId(searchTestId);
    const ingredientOption = screen.getByLabelText('Ingredient');
    const nameOption = screen.getByLabelText('Name');
    const FirstLetterOption = screen.getByLabelText(firstLetterStr);
    const searchButton = screen.getByRole('button', { name: 'Search' });
    expect(searchBar).toBeInTheDocument();
    expect(ingredientOption).toBeInTheDocument();
    expect(nameOption).toBeInTheDocument();
    expect(FirstLetterOption).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it('Testing the meal API call for ingredient option', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mockedBacon)
        .mockResolvedValueOnce(mealCategories)
        .mockResolvedValue(mockedBacon),
    });

    renderWithRouter(<App />, {
      initialEntries: ['/meals'],
    });
    const searchIcon = screen.getByTestId(searchIconTestId);
    userEvent.click(searchIcon);
    const ingredientOption = screen.getByLabelText('Ingredient');
    userEvent.click(ingredientOption);
    const searchBar = screen.getByTestId(searchTestId);
    userEvent.type(searchBar, 'bacon');
    expect(searchBar).toHaveValue('bacon');
    const searchButton = screen.getByRole('button', { name: 'Search' });
    userEvent.click(searchButton);
    expect(global.fetch).toHaveBeenCalledTimes(3);
    const recipes = await screen.findAllByRole('img');
    expect(recipes).toHaveLength(2);
    const mealRecipe = await screen.findByRole('heading', { name: 'English Breakfast', level: 2 });
    expect(mealRecipe).toBeInTheDocument();
  });

  it('Testing the meal API call for name option', async () => {
    const mockedPotato = {
      meals: [
        {
          idMeal: 52877,
          strMeal: 'Lamb and Potato pie',
          strMealThumb: 'https://www.themealdb.com/images/media/meals/sxrpws1511555907.jpg',
        },
        {
          idMeal: 52995,
          strMeal: 'Potato Pie',
          strMealThumb: 'https://www.themealdb.com/images/media/meals/utxryw1511721589.jpg',
        },
      ],
    };

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mockedPotato)
        .mockResolvedValueOnce(mealCategories)
        .mockResolvedValue(mockedPotato),
    });

    renderWithRouter(<App />, {
      initialEntries: ['/meals'],
    });
    const searchIcon = screen.getByTestId(searchIconTestId);
    userEvent.click(searchIcon);
    const nameOption = screen.getByLabelText('Name');
    userEvent.click(nameOption);
    const searchBar = screen.getByTestId(searchTestId);
    userEvent.type(searchBar, 'potato');
    expect(searchBar).toHaveValue('potato');
    const searchButton = screen.getByRole('button', { name: 'Search' });
    userEvent.click(searchButton);
    expect(global.fetch).toHaveBeenCalledTimes(3);
    const recipes = await screen.findAllByRole('img');
    expect(recipes).toHaveLength(2);
    const mealRecipe = await screen.findByRole('heading', { name: 'Lamb and Potato pie', level: 2 });
    expect(mealRecipe).toBeInTheDocument();
  });

  it('Testing the meal API call for first letter option', async () => {
    const mockedLetterV = {
      meals: [
        {
          idMeal: 52775,
          strMeal: 'Vegan Lasagna',
          strMealThumb: 'https://www.themealdb.com/images/media/meals/rvxxuy1468312893.jpg',
        },
        {
          idMeal: 52995,
          strMeal: 'Eggplant Lasagna',
          strMealThumb: 'https://www.themealdb.com/images/media/meals/utxryw1511721589.jpg',
        },
      ],
    };

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mockedLetterV)
        .mockResolvedValueOnce(mealCategories)
        .mockResolvedValue(mockedLetterV),
    });

    renderWithRouter(<App />, {
      initialEntries: ['/meals'],
    });
    const searchIcon = screen.getByTestId(searchIconTestId);
    userEvent.click(searchIcon);
    const firstLetterOption = screen.getByLabelText(firstLetterStr);
    userEvent.click(firstLetterOption);
    const searchBar = screen.getByTestId(searchTestId);
    userEvent.type(searchBar, 'v');
    expect(searchBar).toHaveValue('v');
    const searchButton = screen.getByRole('button', { name: 'Search' });
    userEvent.click(searchButton);
    expect(global.fetch).toHaveBeenCalledTimes(3);
    const recipes = await screen.findAllByRole('img');
    expect(recipes).toHaveLength(2);
    const mealRecipe = await screen.findByRole('heading', { name: 'Vegan Lasagna', level: 2 });
    expect(mealRecipe).toBeInTheDocument();
  });

  it('Testing if typing more than one letter with the first letter option selected will trigger an alert', () => {
    const mockedLetterV = {
      meals: [
        {
          idMeal: 52775,
          strMeal: 'Lasanha Vegana',
          strMealThumb: 'https://www.themealdb.com/images/media/meals/rvxxuy1468312893.jpg',
        },
        {
          idMeal: 52995,
          strMeal: 'Eggplant Lasagna',
          strMealThumb: 'https://www.themealdb.com/images/media/meals/utxryw1511721689.jpg',
        },
      ],
    };
    jest.spyOn(global, 'alert');
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mockedLetterV)
        .mockResolvedValueOnce(mealCategories)
        .mockResolvedValue(mockedLetterV),
    });
    renderWithRouter(<App />, {
      initialEntries: ['/meals'],
    });
    const searchIcon = screen.getByTestId(searchIconTestId);
    userEvent.click(searchIcon);
    const firstLetterOption = screen.getByLabelText(firstLetterStr);
    userEvent.click(firstLetterOption);
    const searchBar = screen.getByTestId(searchTestId);
    userEvent.type(searchBar, 've');
    expect(searchBar).toHaveValue('ve');
    const searchButton = screen.getByRole('button', { name: 'Search' });
    userEvent.click(searchButton);
    expect(global.alert).toHaveBeenCalled();
  });
});
