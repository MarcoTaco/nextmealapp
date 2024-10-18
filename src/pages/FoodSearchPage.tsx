import React, { useState, useEffect } from 'react';
import { fetchRecipesWhole } from '../services/SpoonacularCall.js';
import { useLocation } from 'react-router-dom';
import '../styles/FoodSearchPage.scss';

interface WholeRecipe{
    id: number,
    title: string,
    image: string
};

function FoodSearchPage(){    
    const [recipes, setRecipes] = useState<WholeRecipe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    // new stuff
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query') || '';
    

    useEffect(() =>{
        const getRecipes = async () => {
            try{
                setLoading(true);
                const data = await fetchRecipesWhole(query);
              
                setRecipes(data.results);
            } catch(err){
                setError('Failed to get recipes');
            } finally{
                setLoading(false);
            }
        };

        getRecipes();
    }, []);

    if(loading) return <p>Loading...</p>;
    if(error) return <p>{error}</p>;

    return(
        <div>
            <h1>Recipe Search Results</h1>
            <div className="result-section">
                <div className="result-filter-section">
                    <form>
                        {/* need to think of what to put here for filters. */}
                    </form>
                </div>
                <div className="result-grid">
                    {recipes.map((recipe) => (
                        <div className="result">
                            <img src={recipe.image} alt={recipe.title}></img>
                            <p>{recipe.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
    return(
        <>
            <h2>test</h2>
        </>
    );
}

export default FoodSearchPage;