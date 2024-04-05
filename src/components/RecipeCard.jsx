import React from 'react';

const RecipeCard = ({ meal, onMealClick }) => {
  const { idMeal, strMeal, strMealThumb } = meal;

  const handleClick = () => { // Här ska det hantera klickhändelse för receptkortet
    onMealClick(idMeal);
  };

  return ( // Här ska det rendera receptkortet med titel och bild
    <li key={idMeal} className="recipe-card" onClick={handleClick}>
      <h3>{strMeal}</h3>
      <img src={strMealThumb} alt={strMeal} className="recipe-image" />
    </li>
  );
};

export default RecipeCard;

