import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import RecipesContext from '../context/RecipesContext';
import { createSearchUrl } from '../helpers';

function SearchBar() {
  const [searchOption, setSearchOption] = useState('');
  const [search, setSearch] = useState('');
  const { setSearchData } = useContext(RecipesContext);
  const history = useHistory();
  const { location: { pathname } } = history;

  const verifySearch = () => {
    if (searchOption === 'firstLetter' && search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      // change searchData
      setSearchData(createSearchUrl(pathname, searchOption, search));
    }
  };

  return (
    <div>
      <input
        value={ search }
        onChange={ (e) => setSearch(e.target.value) }
        type="text"
        data-testid="search-input"
      />
      <label htmlFor="ingredient">
        Ingredient
        <input
          type="radio"
          name="search-option"
          id="ingredient"
          value="ingredient"
          data-testid="ingredient-search-radio"
          onClick={ (e) => setSearchOption(e.target.value) }
        />
      </label>
      <label htmlFor="name">
        Name
        <input
          type="radio"
          name="search-option"
          id="name"
          value="name"
          data-testid="name-search-radio"
          onClick={ (e) => setSearchOption(e.target.value) }
        />
      </label>
      <label htmlFor="first-letter">
        First letter
        <input
          type="radio"
          name="search-option"
          id="first-letter"
          value="firstLetter"
          data-testid="first-letter-search-radio"
          onClick={ (e) => setSearchOption(e.target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ verifySearch }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
