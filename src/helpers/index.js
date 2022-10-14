// verify header info depending on the pathname
const verifyHeaderInfo = (path) => {
  switch (path) {
  case '/meals': return { title: 'Meals', search: true };
  case '/drinks': return { title: 'Drinks', search: true };
  case '/profile': return { title: 'Profile', search: false };
  case '/done-recipes': return { title: 'Done Recipes', search: false };
  default: return { title: 'Favorite Recipes', search: false };
  }
};

const TWELVE = 12;
const FIVE = 5;
const SIX = 6;

// base search urls
const MEALS_SEARCH_URL = 'https://www.themealdb.com/api/json/v1/1';
const DRINKS_SEARCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

// verify selected radio buttons
const verifySearchOption = (option, search) => {
  switch (option) {
  case 'ingredient': return `/filter.php?i=${search}`;
  case 'name': return `/search.php?s=${search}`;
  default: return `/search.php?f=${search}`;
  }
};

// create search url with the right options
const createSearchUrl = (path, option, search) => {
  if (path === '/meals') {
    return `${MEALS_SEARCH_URL}${verifySearchOption(option, search)}`;
  }
  return `${DRINKS_SEARCH_URL}${verifySearchOption(option, search)}`;
};

// get recipe info that will be used
const filterRecipeInfo = (recipe) => {
  // remove null or empty string keys of a recipe
  const cleanedRecipe = Object.entries(recipe).filter((value) => value[1]);

  // verify if the recipe type is meal or drink
  const isMeal = cleanedRecipe.some((value) => value[0]
    .includes('Meal'));

  const ingredients = cleanedRecipe
    .filter((value) => value[0].includes('Ingredient')).map((arr) => arr[1]);

  const measures = cleanedRecipe
    .filter((value) => value[0].includes('Measure')).map((arr) => arr[1]);

  const id = isMeal ? recipe.idMeal : recipe.idDrink;
  const name = isMeal ? recipe.strMeal : recipe.strDrink;
  const image = isMeal ? recipe.strMealThumb : recipe.strDrinkThumb;
  const video = isMeal ? recipe.strYoutube : '';
  const category = recipe.strCategory;
  const instructions = recipe.strInstructions;
  const alcoholicOrNot = isMeal ? '' : recipe.strAlcoholic;
  const nationality = isMeal ? recipe.strArea : '';
  const tagName = recipe.strTags
    ? recipe.strTags.split(',') : [];

  return {
    image,
    name,
    category,
    ingredients,
    measures,
    instructions,
    video,
    alcoholicOrNot,
    nationality,
    tagName,
    id,
  };
};

const filterSugestions = (arr) => arr.filter((_, ind) => ind < SIX);

// get sugestion info that will be used
const getSugestionInfo = (path, obj) => {
  const isMeal = path.includes('meals');
  const nameKey = isMeal ? 'strDrink' : 'strMeal';
  const imgKey = isMeal ? 'strDrinkThumb' : 'strMealThumb';
  return { image: obj[imgKey], name: obj[nameKey] };
};

export {
  verifyHeaderInfo,
  createSearchUrl,
  TWELVE,
  FIVE,
  filterRecipeInfo,
  filterSugestions,
  getSugestionInfo,
};
