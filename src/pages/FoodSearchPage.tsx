import React, { useState, useEffect } from 'react';
import { fetchRecipes, fetchRecipeDetails } from '../services/SpoonacularCall.tsx';

interface Recipe{
    id: number,
    title: string,
    image: string
};

function FoodSearchPage(){
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() =>{
        const getRecipes = async () => {
            try{
                setLoading(true);
                const data = await fetchRecipes('pasta');
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
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                        <h3>{recipe.title}</h3>
                        <img src={recipe.image} alt={recipe.title}></img>
                    </li>
                ))};
            </ul>
        </div>
    );
};

export default FoodSearchPage;