import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

function RecipesCard({ recipes }) {
  const history = useHistory();
  const { location: { pathname } } = history;

  // get id depending on pathname
  const getRecipeId = (recipeObj) => {
    if (pathname === '/meals') return recipeObj.idMeal;
    return recipeObj.idDrink;
  };

  return (
    <ul className="recipes bg-gray-200 content-between">
      {
        recipes.map((recipe, index) => (
          <li
            className="bg-white rounded-md text-center text-red-900"
            key={ index }
            data-testid={ `${index}-recipe-card` }
            onClick={ () => history.push(`${pathname}/${getRecipeId(recipe)}`) }
            role="presentation"
          >
            <img
              src={ pathname === '/meals'
                ? recipe.strMealThumb : recipe.strDrinkThumb }
              alt="recipe"
              data-testid={ `${index}-card-img` }
            />
            <h2 data-testid={ `${index}-card-name` }>
              { pathname === '/meals'
                ? recipe.strMeal : recipe.strDrink }
            </h2>
          </li>
        ))
      }
    </ul>
  );
}

RecipesCard.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default RecipesCard;
