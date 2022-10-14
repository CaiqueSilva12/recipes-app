import React, { useContext, useState } from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import likedIcon from '../images/blackHeartIcon.svg';
import {
  FAVORITE_RECIPES,
  readKey,
  removeFavoriteRecipe,
} from '../services/localStorage';
import RecipesContext from '../context/RecipesContext';

function RecipesInfo({ recipes }) {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [copyMessage, setCopyMessage] = useState(false);
  const { setFavoriteRecipes } = useContext(RecipesContext);

  // verify pathname
  const isDonePage = pathname.includes('done');

  // get the first two tags
  const filterTags = (tagsArray) => tagsArray.filter((_, i) => i < 2);

  // map tags to span elements
  const mapTags = (tagsArray, ind) => filterTags(tagsArray).map((tag) => (
    <span
      key={ tag }
      data-testid={ `${ind}-${tag}-horizontal-tag` }
    >
      { tag }
    </span>
  ));

  // copy link and show message
  const copyAndShowMessage = (type, idToCopy) => {
    const pathToUse = type === 'meal' ? 'meals' : 'drinks';
    copy(`http://localhost:3000/${pathToUse}/${idToCopy}`);
    setCopyMessage(true);
    const THREE_SEC = 3000;
    setTimeout(() => setCopyMessage(false), THREE_SEC);
  };

  // reirect to recipe details
  const goToRecipeDetails = (type, recipeId) => {
    const path = type === 'meal' ? 'meals' : 'drinks';
    history.push(`/${path}/${recipeId}`);
  };

  // change favorite recipes in localStorage and context
  const handleFavoriteRecipesState = (idToRemove) => {
    removeFavoriteRecipe(idToRemove);
    setFavoriteRecipes(readKey(FAVORITE_RECIPES));
  };

  // map done recipes in cards
  const mapRecipesInfo = () => recipes
    .map((
      {
        image,
        category,
        name,
        doneDate,
        nationality,
        alcoholicOrNot,
        id,
        tags,
        type,
      },
      index,
    ) => (
      <div key={ `${id}-${index}` } className="done-recipe-card">
        <input
          type="image"
          src={ image }
          alt={ name }
          className="done-recipe-image"
          onClick={ () => goToRecipeDetails(type, id) }
          data-testid={ `${index}-horizontal-image` }
        />
        <span
          data-testid={ `${index}-horizontal-top-text` }
        >
          { type === 'meal' ? `${nationality} - ${category}` : alcoholicOrNot }
        </span>
        <div
          role="presentation"
          onClick={ () => goToRecipeDetails(type, id) }
          data-testid={ `${index}-horizontal-name` }
        >
          { name }
        </div>
        { isDonePage && (
          <span
            data-testid={ `${index}-horizontal-done-date` }
          >
            { doneDate }
          </span>
        ) }
        <input
          type="image"
          src={ shareIcon }
          alt="share"
          onClick={ () => copyAndShowMessage(type, id) }
          data-testid={ `${index}-horizontal-share-btn` }
        />
        {
          !isDonePage && (
            <input
              type="image"
              src={ likedIcon }
              alt="favorite"
              onClick={ () => handleFavoriteRecipesState(id) }
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          )
        }
        { isDonePage && mapTags(tags, index) }
      </div>
    ));

  return (
    <div>
      { mapRecipesInfo() }
      { copyMessage && <span>Link copied!</span> }
    </div>
  );
}

RecipesInfo.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape()).isRequired };

export default RecipesInfo;
