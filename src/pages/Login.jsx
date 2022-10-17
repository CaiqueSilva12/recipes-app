import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { saveUserEmail } from '../services/localStorage';
import '../styles/login.css';

function Login({ history }) {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const changeUser = ({ target: { name, value } }) => {
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const emailRegex = /\S+@\S+\.\S+/i;
  const minLength = 6;

  const isEmailValid = emailRegex.test(user.email);
  const isPasswordValid = user.password.length > minLength;
  const isUserValid = isEmailValid && isPasswordValid;

  // save the email in localStorage
  const saveUserAndRedirect = (e) => {
    e.preventDefault();
    saveUserEmail(user.email);
    history.push('/meals');
  };

  return (
    <div className="login_page flex justify-center">
      <form className="flex flex-col justify-center gap-3 items-center">
        <h1 className="recipes_title">Recipes App</h1>
        <label htmlFor="email" className="flex flex-row justify-center">

          <input
            className="email-input text-center rounded-md"
            type="email"
            value={ user.email }
            name="email"
            id="email"
            data-testid="email-input"
            onChange={ (e) => changeUser(e) }
            placeholder="Email"
          />
        </label>

        <label htmlFor="password" className="flex flex-row justify-center">

          <input
            className="password-input text-center rounded-md"
            type="password"
            name="password"
            id="password"
            value={ user.password }
            data-testid="password-input"
            onChange={ (e) => changeUser(e) }
            placeholder="Password"
          />
        </label>

        <button
          className="login-button text-white bg-red-900 rounded-lg w-28 "
          type="submit"
          data-testid="login-submit-btn"
          onClick={ (e) => saveUserAndRedirect(e) }
          disabled={ !isUserValid }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
