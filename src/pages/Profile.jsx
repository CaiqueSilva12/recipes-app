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
    <div className="flex w-full h-full flex-col">
      <Header />
        <p 
          className="font-bold text-xl text-black"
          data-testid="profile-email">
          { email }
        </p>

      <div className="flex h-full flex-col justify-center">
        <button
          className="bg-red-900 rounded-md text-white my-1 px-1 py-0"
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => redirect('/done-recipes') }
        >
          Done Recipes
        </button>

        <button
          className="bg-red-900 rounded-md text-white my-1 px-1 py-0"
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => redirect('/favorite-recipes') }
        >
          Favorite Recipes
        </button>

        <button
          className="bg-red-900 rounded-md text-white my-1 px-1 py-0"
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
