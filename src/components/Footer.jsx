import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();

  const redirect = (pathname) => {
    history.push(pathname);
  };

  return (
    <footer
    className="footer bg-yellow-500 w-full flex justify-between py-2"
    data-testid="footer">
      <input
        data-testid="drinks-bottom-btn"
        type="image"
        alt="drinks"
        onClick={ () => redirect('/drinks') }
        src={ drinkIcon }
      />

      <input
        data-testid="meals-bottom-btn"
        type="image"
        alt="meals"
        onClick={ () => redirect('/meals') }
        src={ mealIcon }
      />
    </footer>
  );
}

export default Footer;
