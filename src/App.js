import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router';
import RecipesProvider from './context/RecipesProvider';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';
import DoneRecipes from './pages/DoneRecipes';
import RecipeInProgress from './pages/RecipeInProgress';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';

function App() {
  return (
    <RecipesProvider>
      <div className="meals">
        <Switch>
          <Route
            path="/meals/:id/in-progress"
            component={ RecipeInProgress }
          />

          <Route
            path="/drinks/:id/in-progress"
            component={ RecipeInProgress }
          />

          <Route exact path="/meals/:id" component={ RecipeDetails } />
          <Route exact path="/drinks/:id" component={ RecipeDetails } />

          <Route exact path="/meals" component={ Recipes } />
          <Route exact path="/drinks" component={ Recipes } />

          <Route path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />

          <Route exact path="/" component={ Login } />
        </Switch>
      </div>
    </RecipesProvider>
  );
}

export default App;
