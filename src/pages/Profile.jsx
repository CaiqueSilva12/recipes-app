import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const history = useHistory();
  const { email } = JSON.parse(localStorage.getItem('user')) || '';

  const redirect = (pathname) => {
    history.push(pathname);
  };

  const logoutButton = () => {
    localStorage.clear();
    redirect('/');
  };
  return (
    <div>
      <Header />
      <div>
        <p data-testid="profile-email">{ email }</p>

        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => redirect('/done-recipes') }
        >
          Done Recipes
        </button>

        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => redirect('/favorite-recipes') }
        >
          Favorite Recipes
        </button>

        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ logoutButton }
        >
          Logout
        </button>

      </div>
      <Footer />
    </div>
  );
}

export default Profile;
