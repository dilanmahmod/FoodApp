import React, { useState } from 'react';
import RecipeCard from './RecipeCard'; // Importera RecipeCard-komponenten

const SearchComponent = ({ onMealClick }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedMealId, setSelectedMealId] = useState(null);

    // TODO: Hur gör jag för att återställa sökresultatet?
    // Kanske genom att setSearchResults blir tom, null...?
    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
            const data = await response.json();
            setSearchResults(data.meals || []);
        } catch (error) {
            console.error('Error fetching meals:', error);
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleMealClick = (mealId) => {
        setSelectedMealId(mealId);
        onMealClick(mealId); // Skicka den valda maträttens ID till förälderkomponenten
    };

    return (
        <div>
            <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Sök på en maträtt..." />
            <button onClick={handleSearch}>Sök</button>
            {loading && <p>Laddar...</p>}
            {selectedMealId && searchResults.length === 0 && <p>Inga sökresultat hittades</p>}
            {searchResults.length > 0 && !selectedMealId && (
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

