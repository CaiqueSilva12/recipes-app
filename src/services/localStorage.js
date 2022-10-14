// consts to interact with localStorage
const MEALS_TOKEN = 'mealsToken';
const DRINKS_TOKEN = 'drinksToken';
const USER = 'user';
const DONE_RECIPES = 'doneRecipes';
const FAVORITE_RECIPES = 'favoriteRecipes';
const IN_PROGRESS_RECIPES = 'inProgressRecipes';

// read any key
const readKey = (key) => JSON.parse(localStorage.getItem(key)) || [];

// save any key
const saveKey = (key, value) => {
  if (typeof value === 'string') localStorage.setItem(key, value);
  else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// save the user email
const saveUserEmail = (userEmail) => {
  saveKey(USER, { email: userEmail });
  saveKey(MEALS_TOKEN, 1);
  saveKey(DRINKS_TOKEN, 1);
};

// save a favorited recipe
const saveFavoriteRecipe = (newRecipe) => {
  const favoriteRecipes = readKey(FAVORITE_RECIPES);
  saveKey(FAVORITE_RECIPES, [...favoriteRecipes, newRecipe]);
};

// remove a favorited recipe by id
const removeFavoriteRecipe = (id) => {
  const favoriteRecipes = readKey(FAVORITE_RECIPES);
  saveKey(FAVORITE_RECIPES, favoriteRecipes.filter((recipe) => recipe.id !== id));
};

// verify if recipe is already favorited
const isFavorite = (recipe) => {
  const favoriteRecipes = readKey(FAVORITE_RECIPES);
  if (!favoriteRecipes.length) return false;
  return favoriteRecipes.some(({ id }) => id === recipe.id);
};

// toggle favorited recipe
const toggleFavoriteRecipe = (recipe) => {
  if (isFavorite(recipe)) removeFavoriteRecipe(recipe.id);
  else { saveFavoriteRecipe(recipe); }
};

// get recipes in progress
const readProgressRecipes = () => JSON
  .parse(localStorage.getItem(IN_PROGRESS_RECIPES)) || {
  drinks: {}, meals: {},
};

// save or remove recipe in progress
const changeRecipeInProgress = (key, id, progress) => {
  const inProgress = readProgressRecipes();
  const newInProgress = {
    ...inProgress,
    [key]: {
      ...inProgress[key],
      [id]: progress,
    } };
  saveKey(IN_PROGRESS_RECIPES, newInProgress);
};

// save done recipes
const saveDoneRecipes = (recipe) => {
  const doneRecipes = readKey(DONE_RECIPES);
  saveKey(DONE_RECIPES, [...doneRecipes, recipe]);
};

export {
  MEALS_TOKEN,
  DRINKS_TOKEN,
  USER,
  DONE_RECIPES,
  FAVORITE_RECIPES,
  IN_PROGRESS_RECIPES,
  readKey,
  saveKey,
  saveUserEmail,
  readProgressRecipes,
  toggleFavoriteRecipe,
  isFavorite,
  changeRecipeInProgress,
  saveDoneRecipes,
  removeFavoriteRecipe,
};
