import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import RecipesContext from '../context/RecipesContext';
import { fetchRecipeCategories, fetchFilterCategory } from '../services/requestAPI';
import { TWELVE, FIVE, verifyHeaderInfo  } from '../helpers';

function Categories() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [categories, setCategories] = useState([]);
  const [categoryClicked, setCategoryClicked] = useState('');
  const {
    recipes,
    setRecipes,
    fetchRecipes,
  } = useContext(RecipesContext);

  const { title } = verifyHeaderInfo(pathname);

  // fetch categories depending on the pathname
  const fetchCategories = async () => {
    const results = await fetchRecipeCategories(pathname);
    if (Array.isArray(results)) setCategories(results.filter((_, i) => i < FIVE));
  };

  // fetch categories when the pathname changes
  useEffect(() => {
    fetchCategories();
    return () => setCategories([]);
  }, [recipes]);

  // fetch category clicked
  const filterRecipeCategory = async (category) => {
    const results = await fetchFilterCategory(pathname, category);
    setRecipes(results.filter((_, ind) => ind < TWELVE));
  };

  // fetch categories or recipes
  const fetchCategoriesOrRecipes = () => {
    if (categoryClicked) filterRecipeCategory(categoryClicked);
    if (!categoryClicked) fetchRecipes(pathname);
  };

  useEffect(() => {
    fetchCategoriesOrRecipes();
  }, [categoryClicked]);

  return (
    <div className="w-full bg-white">
      <h1
      className="header-title flex justify-center text-red-900 text-3xl font-sans"
      data-testid="page-title">
        { title }
        </h1>
    <div className="bg-white w-full flex justify-evenly ">
      {
        categories.length && categories
          .map(({ strCategory }, index) => (
            <button
              className="bg-red-900 rounded-md text-white my-1"
              type="button"
              key={ `${strCategory}-${index}` }
              onClick={ () => setCategoryClicked((prev) => {
                if (prev === strCategory) return '';
                return strCategory;
              }) }
              data-testid={ `${strCategory}-category-filter` }
            >
              { strCategory }
            </button>
          ))
      }
      <button
        className="bg-red-900 rounded-md text-white my-1 py-1"
        type="button"
        onClick={ () => fetchRecipes(pathname) }
        data-testid="All-category-filter"
      >
        All
      </button>
    </div>
    </div>
  );
}

export default Categories;
