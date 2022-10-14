import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { verifyHeaderInfo } from '../helpers';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const { title, search } = verifyHeaderInfo(pathname);
  const [showBar, setShowBar] = useState(false);

  return (
    <header>
      <h1 data-testid="page-title">{ title }</h1>

      <input
        type="image"
        src={ profileIcon }
        alt="profile icon"
        data-testid="profile-top-btn"
        onClick={ () => history.push('/profile') }
      />

      { search && (
        <input
          type="image"
          src={ searchIcon }
          alt="search icon"
          data-testid="search-top-btn"
          onClick={ () => setShowBar((prevShow) => !prevShow) }
        />
      ) }

      { showBar && <SearchBar /> }
    </header>
  );
}

export default Header;
