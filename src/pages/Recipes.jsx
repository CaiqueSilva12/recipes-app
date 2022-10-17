import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import { fetchSearch } from '../services/requestAPI';
import RecipesCard from '../components/RecipesCard';
import Categories from '../components/Categories';

function Recipes() {
  const {
    searchData,
    recipes,
    setRecipes,
    fetchRecipes,
  } = useContext(RecipesContext);
  const history = useHistory();
  const { location: { pathname } } = history;

  const TWELVE = 12;

  // search results on the corresponding api
  const searchResults = async () => {
    const apiData = await fetchSearch(searchData);
    const results = apiData ? apiData[pathname.replace('/', '')] : '';
    if (!results) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (results.length === 1) {
      const recipeId = pathname === '/meals'
        ? results[0].idMeal : results[0].idDrink;
      history.push(`${pathname}/${recipeId}`);
    } else {
      setRecipes(results.filter((_, ind) => ind < TWELVE));
    }
  };

  // fetch search data when searchData changes
  useEffect(() => {
    if (searchData.length) searchResults();
  }, [searchData]);

  // fetch recipes when the component is mounted
  useEffect(() => {
    fetchRecipes(pathname);
    // clean recepies when unmounted
    return () => setRecipes([]);
  }, []);

  // fetch recipes when the pathname changes
  useEffect(() => {
    fetchRecipes(pathname);
  }, [pathname]);

  return (
    <>
      <Header />
      { recipes.length && (
        <>
          <Categories />
          <RecipesCard recipes={ recipes } />
        </>
      ) }
      <Footer />
    </>
  );
}

export default Recipes;
