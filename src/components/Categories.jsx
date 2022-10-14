import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import RecipesContext from '../context/RecipesContext';
import { fetchRecipeCategories, fetchFilterCategory } from '../services/requestAPI';
import { TWELVE, FIVE } from '../helpers';

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
    <div>
      {
        categories.length && categories
          .map(({ strCategory }, index) => (
            <button
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
        type="button"
        onClick={ () => fetchRecipes(pathname) }
        data-testid="All-category-filter"
      >
        All
      </button>
    </div>
  );
}

export default Categories;
