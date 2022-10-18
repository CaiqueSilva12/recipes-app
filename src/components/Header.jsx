import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { verifyHeaderInfo } from '../helpers';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../styles/header.css'

function Header() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const { search } = verifyHeaderInfo(pathname);
  const [showBar, setShowBar] = useState(false);

  return (
    <header className="header bg bg-yellow-500">
      <h1
      className="header-title underline font-serif font-bold flex justify-center text-red-900 text-3xl font-sans"
      data-testid="page-title">
        Recipes App
        </h1>
        <div className="flex justify-between">
      { search && (
        <input
          className="rounded-3xl"
          type="image"
          src={ searchIcon }
          alt="search icon"
          data-testid="search-top-btn"
          onClick={ () => setShowBar((prevShow) => !prevShow) }
        />
      ) }

      { showBar && <SearchBar /> }

      <input
        className="rounded-3xl bg-red-900 p-1"
        type="image"
        src={ profileIcon }
        alt="profile icon"
        data-testid="profile-top-btn"
        onClick={ () => history.push('/profile') }
      />
      </div>
    </header>
  );
}

export default Header;
