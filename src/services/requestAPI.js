import { filterSugestions } from '../helpers';

// request search api
const fetchSearch = async (searchUrl) => {
  try {
    const response = await fetch(searchUrl);
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

// fetch recipes depending on pathname
const fetchMealOrDrink = async (path) => {
  const chosenApi = path === '/meals' ? 'themealdb' : 'thecocktaildb';
  const url = `https://www.${chosenApi}.com/api/json/v1/1/search.php?s=`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data[path.replace('/', '')])
    .catch((error) => console.log(error.message));
};

// fetch available categories
const fetchRecipeCategories = async (path) => {
  const chosenApi = path === '/meals' ? 'themealdb' : 'thecocktaildb';
  const url = `https://www.${chosenApi}.com/api/json/v1/1/list.php?c=list`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data[path.replace('/', '')])
    .catch((error) => console.log(error.message));
};

// fetch recipes by category
const fetchFilterCategory = async (path, category) => {
  const chosenApi = path === '/meals' ? 'themealdb' : 'thecocktaildb';
  const url = `https://www.${chosenApi}.com/api/json/v1/1/filter.php?c=${category}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data[path.replace('/', '')])
    .catch((error) => console.log(error.message));
};

// fetch a specific recipe by id
const fetchRecipeById = async (path, id) => {
  const chosenApi = path.includes('/meals')
    ? 'themealdb' : 'thecocktaildb';
  const dataKey = path.includes('/meals') ? 'meals' : 'drinks';
  const url = `https://www.${chosenApi}.com/api/json/v1/1/lookup.php?i=${id}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data[dataKey])
    .catch((error) => console.log(error.message));
};

// fetch recipe sugestions depending on pathname
const fetchSugestions = async (path) => {
  const chosenApi = path.includes('/meals')
    ? 'thecocktaildb' : 'themealdb';
  const dataKey = path.includes('/meals')
    ? 'drinks' : 'meals';
  const url = `https://www.${chosenApi}.com/api/json/v1/1/search.php?s=`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => filterSugestions(data[dataKey]))
    .catch((error) => console.log(error.message));
};

export {
  fetchSearch,
  fetchMealOrDrink,
  fetchRecipeCategories,
  fetchFilterCategory,
  fetchRecipeById,
  fetchSugestions,
};
