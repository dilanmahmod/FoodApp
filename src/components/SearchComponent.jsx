import React, { useState } from 'react';
import RecipeCard from './RecipeCard';

const SearchComponent = ({ onMealClick, setSearchResults, searchResults }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [noResultsFound, setNoResultsFound] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
            const data = await response.json();
            setSearchResults(data.meals || []);
            setNoResultsFound(data.meals === null || data.meals.length === 0); // Här ska det uppdatera noResultsFound beroende på sökresultaten
        } catch (error) {
            console.error('Error fetching meals:', error);
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
        setNoResultsFound(false); // Återställa noResultsFound när användaren börjar skriva igen
    };

    const handleMealClick = (mealId) => {
        onMealClick(mealId);
    };

    return (
        <div>
            <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Sök på en maträtt..." />
            <button onClick={handleSearch}>Sök</button>
            {loading && <p>Laddar...</p>}
            {noResultsFound && <p>Inga sökresultat hittades</p>} {/* Visa detta meddelande om inga resultat finns */}
            {searchResults.length > 0 && (
                <ul>
                    {searchResults.map(meal => (
                        <RecipeCard key={meal.idMeal} meal={meal} onMealClick={handleMealClick} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchComponent;

