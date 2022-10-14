import React, { useContext } from 'react';
import FilterButtons from '../components/FilterButtons';
import Header from '../components/Header';
import RecipesInfo from '../components/RecipesInfo';
import RecipesContext from '../context/RecipesContext';
import { FAVORITE_RECIPES, readKey } from '../services/localStorage';

function FavoriteRecipes() {
  const favoriteRecipes = readKey(FAVORITE_RECIPES);
  const { filter } = useContext(RecipesContext);

  // filter recipes to show
  const filteredRecipes = favoriteRecipes
    .filter(({ type }) => filter === 'all' || type === filter);

  return (
    <div>
      <Header />
      <FilterButtons />
      <RecipesInfo recipes={ filteredRecipes } />
    </div>
  );
}

export default FavoriteRecipes;
