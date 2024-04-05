import React, { useState, useEffect } from 'react';

const MealDetails = ({ mealId }) => {
  const [mealDetails, setMealDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        // Här ska den hämta måltidsdetaljer från API:et baserat på mealId
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        if (!response.ok) {  // Hör görs det kontroll från API:et om det är ok
          throw new Error('Failed to fetch meal details');
        }
        const data = await response.json(); // Extrahera data från JSON-svaret
        setMealDetails(data.meals[0]); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching meal details:', error); 
        setLoading(false);
      }
    };

    fetchMealDetails();  // Anropa funktionen för att hämta maträttssdetaljer

   
    return () => {
     
    };
  }, [mealId]);

  const handleClick = () => {  // Hantera klickhändelse för maträttsdetaljerna
    console.log('Meal details clicked!');
  };

  if (loading) { // Visa laddningsmeddelande om data fortfarande hämtas
    return <div>Loading...</div>;
  }

  if (!mealDetails) {  // Visa felmeddelande om det inte finns några maträttsdetaljer
    return <div>Failed to fetch meal details.</div>;
  }

  return ( // Visa maträttsdetaljerna om allt har hämtats rätt
    <div className="meal-details" onClick={handleClick}>
      <h2>{mealDetails.strMeal}</h2>
      <img src={mealDetails.strMealThumb} alt={mealDetails.strMeal} />
      <p>{mealDetails.strInstructions}</p>
    </div>
  );
};

export default MealDetails;

