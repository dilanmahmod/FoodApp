import React from 'react';

const RecipeCard = ({ meal, onMealClick }) => {
  const { idMeal, strMeal, strMealThumb } = meal;

  const handleClick = () => {
    onMealClick(idMeal);
  };

  return (
    <li key={idMeal} className="recipe-card" onClick={handleClick}>
      <h3>{strMeal}</h3>
      <img src={strMealThumb} alt={strMeal} className="recipe-image" />
    </li>
  );
};

export default RecipeCard;

