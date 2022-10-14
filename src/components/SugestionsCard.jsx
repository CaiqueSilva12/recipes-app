import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { getSugestionInfo } from '../helpers';

function SugestionsCard({ sugestions }) {
  const { location: { pathname } } = useHistory();

  // map sugestions keys needed
  const mappedSugestions = sugestions
    .map((sugestion) => getSugestionInfo(pathname, sugestion));

  return (
    <div className="sugestions-container">
      <h3>Recommendations :</h3>
      <div className="sugestions-list">
        { mappedSugestions.map(({ name, image }, index) => (
          <section
            key={ `${name}-${index}` }
            data-testid={ `${index}-recommendation-card` }
          >
            <img
              src={ image }
              alt={ name }
            />
            <span
              data-testid={ `${index}-recommendation-title` }
            >
              { name }
            </span>
          </section>
        )) }
      </div>
    </div>
  );
}

SugestionsCard.propTypes = {
  sugestions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default SugestionsCard;
