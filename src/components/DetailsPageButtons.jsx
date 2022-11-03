import React, { useState, useContext, useEffect } from 'react';
import copy from 'clipboard-copy';
import { useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import unlikedIcon from '../images/whiteHeartIcon.svg';
import likedIcon from '../images/blackHeartIcon.svg';
import RecipesContext from '../context/RecipesContext';
import {
  readKey,
  FAVORITE_RECIPES,
} from '../services/localStorage';

function DetailsPageButtons() {
  const [copyMessage, setCopyMessage] = useState(false);
  const {
    changeFavoriteRecipes,
    favoriteRecipes,
  } = useContext(RecipesContext);
  const [icon, setIcon] = useState(unlikedIcon);
  // const { location: { pathname } } = useHistory();
  const { id } = useParams();

  // copy link and show message
  const copyAndShowMessage = () => {
    copy(window.location.href.replace('/in-progress', ''));
    setCopyMessage(true);
    const THREE_SEC = 3000;
    setTimeout(() => setCopyMessage(false), THREE_SEC);
  };

  // change icon when favorite recipes are changed
  useEffect(() => {
    const newFavoriteRecipes = readKey(FAVORITE_RECIPES);
    console.log(newFavoriteRecipes);
    console.log(id);
    const isFavorite = newFavoriteRecipes.some((favorite) => favorite.id === id);
    const newIcon = isFavorite ? likedIcon : unlikedIcon;
    console.log(newIcon);
    setIcon(newIcon);
  }, [favoriteRecipes]);

  return (
    <div className="fixed top-0 left-0 w-full flex justify-end bg-yellow-500">
      <input
        type="image"
        src={ shareIcon }
        alt="share"
        onClick={ copyAndShowMessage }
        data-testid="share-btn"
      />
      { copyMessage && <span>Link copied!</span> }
      <input
        type="image"
        src={ icon }
        alt="favorite"
        onClick={ () => changeFavoriteRecipes() }
        data-testid="favorite-btn"
      />
    </div>
  );
}

export default DetailsPageButtons;
