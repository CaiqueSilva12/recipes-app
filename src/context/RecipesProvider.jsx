import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import { fetchMealOrDrink } from '../services/requestAPI';
import { TWELVE } from '../helpers';
import {
  readKey,
  FAVORITE_RECIPES,
  toggleFavoriteRecipe,
} from '../services/localStorage';

export default function RecipesProvider({ children }) {
  const [searchData, setSearchData] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [recipe, setRecipe] = useState({});
  const [
    favoriteRecipes,
    setFavoriteRecipes,
  ] = useState(readKey(FAVORITE_RECIPES));
  const [filter, setFilter] = useState('all');

  // fetch recepies depending on the pathname
  const fetchRecipes = async (path) => {
    const results = await fetchMealOrDrink(path);
    if (Array.isArray(results)) setRecipes(results.filter((_, i) => i < TWELVE));
  };

  // create recipe object to save
  const recipeToSave = () => {
    const { name, image, alcoholicOrNot, nationality,
      category, id } = recipe;
    const type = nationality !== '' ? 'meal' : 'drink';
    return {
      id,
      type,
      nationality,
      category,
      alcoholicOrNot,
      name,
      image,
    };
  };

  // change favorited recipes on localStorage and context
  const changeFavoriteRecipes = () => {
    toggleFavoriteRecipe(recipeToSave());
    const newFavoriteRecipes = readKey(FAVORITE_RECIPES);
    setFavoriteRecipes(newFavoriteRecipes);
  };

  const context = {
    searchData,
    setSearchData,
    recipes,
    setRecipes,
    fetchRecipes,
    recipe,
    setRecipe,
    favoriteRecipes,
    setFavoriteRecipes,
    filter,
    setFilter,
    changeFavoriteRecipes,
  };

  return (
    <RecipesContext.Provider value={ context }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
