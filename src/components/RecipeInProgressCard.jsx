import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import {
  // saveKey,
  // DONE_RECIPES,
  saveDoneRecipes,
  changeRecipeInProgress,
  readProgressRecipes,
} from '../services/localStorage';

function RecipeInProgressCard({ recipe }) {
  const history = useHistory();
  const { location: { pathname } } = history;
  const { id } = useParams();
  const {
    image,
    name,
    category,
    ingredients,
    measures,
    instructions,
    alcoholicOrNot,
    nationality,
    tagName,
  } = recipe;

  // get saved key depending on pathname
  const progressKey = pathname.includes('meals') ? 'meals' : 'drinks';

  // get ingredients saved
  const startIngredients = readProgressRecipes()[progressKey][id] || [];

  // set checkboxes initial state
  const initialChecks = ingredients.map((ingredient) => startIngredients
    .includes(ingredient));

  // the checkboxes state is here
  const [checks, setChecks] = useState(initialChecks);

  // change a checkbox state by index
  const changeDoneCheckbox = (ind) => {
    setChecks((prevChecks) => prevChecks.map((todo, index) => {
      if (ind === index) return !todo;
      return todo;
    }));
  };

  // save recipe progress when a checkbox is changed
  useEffect(() => {
    const usedIngredients = ingredients.filter((_, i) => checks[i]);
    // save or remove recipe progress
    if (checks.some((bool) => bool)) {
      changeRecipeInProgress(progressKey, id, usedIngredients);
    }
  }, [checks]);

  // list items with checkbox
  const ingredientsList = () => ingredients
    .map((value, index) => (
      <label
        key={ `${value}-${index}` }
        data-testid={ `${index}-ingredient-step` }
        htmlFor={ `${value}-${index}` }
      >
        <input
          type="checkbox"
          id={ `${value}-${index}` }
          checked={ checks[index] }
          onChange={ () => changeDoneCheckbox(index) }
        />
        <span
          className={ checks[index] ? 'done-step' : '' }
        >
          { `${value} ${measures[index] || ''}` }
        </span>
      </label>
    ));

  const recipeType = pathname.includes('meals') ? 'meal' : 'drink';

  // create done recipe object
  const doneRecipeObject = () => ({
    id,
    type: recipeType,
    nationality,
    category,
    alcoholicOrNot,
    name,
    image,
    doneDate: new Date().toLocaleDateString(),
    tags: tagName,
  });

  // save finished recipe and redirect
  const finishRecipeAndRedirect = () => {
    history.push('/done-recipes');
    saveDoneRecipes(doneRecipeObject());
  };

  return (
    <div className="recipe-details-container">
      <img
        src={ image }
        alt={ name }
        data-testid="recipe-photo"
      />
      <h3 data-testid="recipe-title">{ name }</h3>
      <span data-testid="recipe-category">
        { pathname.includes('meals') ? category : alcoholicOrNot }
      </span>
      <div>{ ingredientsList() }</div>
      <p data-testid="instructions">{ instructions }</p>
      <button
        type="button"
        onClick={ finishRecipeAndRedirect }
        className="start-recipe-btn"
        data-testid="finish-recipe-btn"
        disabled={ !checks.every((todo) => todo) }
      >
        Finish Recipe
      </button>
    </div>
  );
}

RecipeInProgressCard.propTypes = { recipe: PropTypes.shape().isRequired };

export default RecipeInProgressCard;
