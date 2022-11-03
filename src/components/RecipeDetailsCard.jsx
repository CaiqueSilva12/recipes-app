import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function RecipeDetailsCard({ recipe }) {
  const { location: { pathname } } = useHistory();
  const {
    image,
    name,
    category,
    ingredients,
    measures,
    instructions,
    video,
    alcoholicOrNot,
  } = recipe;

  // ingredients and measures list items
  const ingredientsList = () => ingredients
    .map((value, index) => (
      <li
        key={ `${value}-${index}` }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        { `${value} ${measures[index] || ''}` }
      </li>
    ));

  return (
    <div className="recipe-details-container flex flex-col items-center">
        <div
          className="text-center bg-white rounded-xl mt-7"
        >
          <img 
            className=""
            src={ image }
            alt={ name }
            data-testid="recipe-photo"
          />
          <h3
            className="my-1 font-bold text-red-900"
            data-testid="recipe-title"
          >
            { name }
          </h3>
        </div>
      <span data-testid="recipe-category">
        { pathname.includes('meals') ? category : alcoholicOrNot }
      </span>
      { video && (
        <iframe
          title={ name }
          height="200"
          width="320"
          data-testid="video"
          src={ video?.replace('watch?v=', 'embed/') }
        />
      ) }
      <ul>{ ingredientsList() }</ul>
      <p data-testid="instructions">{ instructions }</p>
    </div>
  );
}

RecipeDetailsCard.propTypes = { recipe: PropTypes.shape().isRequired };

export default RecipeDetailsCard;
