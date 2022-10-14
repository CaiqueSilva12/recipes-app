import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function FilterButtons() {
  const { setFilter } = useContext(RecipesContext);

  return (
    <div>
      <button
        type="button"
        value="all"
        onClick={ (e) => setFilter(e.target.value) }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        value="meal"
        onClick={ (e) => setFilter(e.target.value) }
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        type="button"
        value="drink"
        onClick={ (e) => setFilter(e.target.value) }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
    </div>
  );
}

export default FilterButtons;
