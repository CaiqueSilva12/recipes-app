import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RecipeDetailsCard from '../components/RecipeDetailsCard';
import { filterRecipeInfo } from '../helpers';
import { fetchRecipeById, fetchSugestions } from '../services/requestAPI';
import SugestionsCard from '../components/SugestionsCard';
import {
  readKey,
  DONE_RECIPES,
  readProgressRecipes,
} from '../services/localStorage';
import DetailsPageButtons from '../components/DetailsPageButtons';
import RecipesContext from '../context/RecipesContext';

function RecipeDetails() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const { id } = useParams();
  const { recipe, setRecipe } = useContext(RecipesContext);
  const [sugestions, setSugestions] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);

  // verify if this recipe is done
  const verifyRecipeDone = () => {
    const doneRecipes = readKey(DONE_RECIPES);
    setIsDone(doneRecipes.some((done) => done.id === id));
  };

  // verify if this recipe is in progress
  const verifyRecipeProgress = () => {
    const inProgress = readProgressRecipes();
    const currPath = pathname.includes('meals') ? 'meals' : 'drinks';
    setIsInProgress(Object.keys(inProgress[currPath]).includes(id));
  };

  // get recipe details
  const fetchRecipeDetails = async () => {
    const newRecipe = await fetchRecipeById(pathname, id);
    setRecipe(filterRecipeInfo(newRecipe[0]));
  };

  // change sugestions depending on pathname
  const changeSugestions = async () => {
    setSugestions(await fetchSugestions(pathname));
  };

  useEffect(() => {
    fetchRecipeDetails();
    changeSugestions();
    verifyRecipeDone();
    verifyRecipeProgress();
  }, []);

  return (
    <div className="recipe-details-page ">
      <DetailsPageButtons />
      {
        Object.keys(recipe).length && (
          <RecipeDetailsCard recipe={ recipe } />
        )
      }
      {
        sugestions && (
          <SugestionsCard sugestions={ sugestions } />
        )
      }
      {
        !isDone && (
          <button
            className="start-recipe-btn"
            type="button"
            onClick={ () => history.push(`${pathname}/in-progress`) }
            data-testid="start-recipe-btn"
          >
            { isInProgress ? 'Continue Recipe' : 'Start Recipe' }
          </button>
        )
      }
    </div>
  );
}

export default RecipeDetails;
