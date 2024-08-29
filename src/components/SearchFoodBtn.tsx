// i want this component to be a search input box when im searching for whole foods ex: chicken, steak, pasta. going to be on the 
// top right of the screen, as well as the page where the foods are being displayed.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchFoodBtn(){
    const [searchFoodTxt, setSearchFoodTxt] = useState<string>('');
    // find out what navigate is
    const navigate = useNavigate();

    function handleSearchFood(e: React.FormEvent){
        e.preventDefault();
        navigate(`/food-menu?query=${searchFoodTxt}`);
    }

    return(
        <div className="search-food-btn-container">
            <div className="search-food-btn">
                <input type="text" value={searchFoodTxt} onChange={(e) => setSearchFoodTxt(e.target.value)} placeholder="Search Food" />
                <button onClick={handleSearchFood}>Search</button>
            </div>
        </div>
    );
}

export default SearchFoodBtn;