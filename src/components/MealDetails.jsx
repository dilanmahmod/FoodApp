import React, { useState, useEffect } from 'react';

const MealDetails = ({ mealId }) => {
  const [mealDetails, setMealDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch meal details');
        }
        const data = await response.json();
        setMealDetails(data.meals[0]); // Assuming the API returns an object with a 'meals' array
        setLoading(false);
      } catch (error) {
        console.error('Error fetching meal details:', error);
        setLoading(false);
      }
    };

    fetchMealDetails();

    // Cleanup function to abort fetch if component unmounts before fetch completes
    return () => {
      // Abort fetch if it is still in progress
    };
  }, [mealId]);

  const handleClick = () => {
    // Dina handlingar när användaren klickar på maträtten, till exempel navigering eller att visa mer detaljer
    console.log('Meal details clicked!');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!mealDetails) {
    return <div>Failed to fetch meal details.</div>;
  }

  return (
    <div onClick={handleClick}>
      <h2>{mealDetails.strMeal}</h2>
      <img src={mealDetails.strMealThumb} alt={mealDetails.strMeal} />
      <p>{mealDetails.strInstructions}</p>
      {/*  */}
    </div>
  );
};

export default MealDetails;
