import React, { useState } from 'react';
import SearchComponent from './components/SearchComponent';
import MealDetails from './components/MealDetails';
import "./App.css";

function App() {
  const [selectedMealId, setSelectedMealId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const handleMealClick = (mealId) => {
    setSelectedMealId(mealId);
    setSearchResults([]); // Här ska den nollställa sökresultaten till en tom array när en maträtt väljs
  };

  return (
    <div className="app-container">
      <h1>Maträttsapplikation</h1>
      <div className="search-container">
        {/* Här ska det skicka setSearchResults som en prop till SearchComponent */}
        <SearchComponent onMealClick={handleMealClick} setSearchResults={setSearchResults} searchResults={searchResults} />
      </div>
      <div className="details-container">
        {selectedMealId && <MealDetails mealId={selectedMealId} />}
      </div>
    </div>
  );
}

export default App;
