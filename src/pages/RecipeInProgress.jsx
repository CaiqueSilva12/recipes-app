import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import DetailsPageButtons from '../components/DetailsPageButtons';
import RecipesContext from '../context/RecipesContext';
import { fetchRecipeById } from '../services/requestAPI';
import { filterRecipeInfo } from '../helpers';
import RecipeInProgressCard from '../components/RecipeInProgressCard';

function RecipeInProgress() {
  const { location: { pathname } } = useHistory();
  const { id } = useParams();
  const { recipe, setRecipe } = useContext(RecipesContext);

  // get recipe details
  const fetchRecipeDetails = async () => {
    const newRecipe = await fetchRecipeById(pathname, id);
    setRecipe(filterRecipeInfo(newRecipe[0]));
  };

  useEffect(() => {
    fetchRecipeDetails();
  }, []);

  return (
    <div>
      {
        Object.keys(recipe).length
          && <RecipeInProgressCard recipe={ recipe } />
      }
      <DetailsPageButtons />
    </div>
  );
}

export default RecipeInProgress;
