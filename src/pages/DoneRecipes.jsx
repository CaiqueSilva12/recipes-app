// import React, { useState } from 'react';
import React, { useContext } from 'react';
import RecipesInfo from '../components/RecipesInfo';
import FilterButtons from '../components/FilterButtons';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import { readKey, DONE_RECIPES } from '../services/localStorage';

function DoneRecipes() {
  const doneRecipes = readKey(DONE_RECIPES);
  const { filter } = useContext(RecipesContext);

  // filter recipes to show
  const filteredRecipes = doneRecipes
    .filter(({ type }) => filter === 'all' || type === filter);

  return (
    <>
      <Header />
      <FilterButtons />
      <RecipesInfo recipes={ filteredRecipes } />
    </>
  );
}

export default DoneRecipes;
