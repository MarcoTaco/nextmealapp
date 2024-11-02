import React, { useState, useEffect } from "react";
import { fetchRecipeInstructions } from '../services/SpoonacularCall.js';
import { useLocation } from "react-router-dom";

interface RecipeInstructions{
    name: string,
    steps:{
        // ingredients are the ingredient for each step.
        ingredients:{
            id: number,
            name: string
        }[];
        // number is numbering the steps step by step, step is the instruction on what to do
        number: number,
        step: string,
    }[];
}

function FoodResultPage(){
    const[recipe, setRecipe] = useState<RecipeInstructions | null>(null);
    const[loading, setLoading] = useState<boolean>(true);
    const[error, setError] = useState<string | null>(null);

    // const location = useLocation();
    // const query = new URLSearchParams(location.search).get('query') || '';

    // i imagine we'll need a way to pass id from the foodsearchpage file so we know which one to look for
    // putting random number for now.
    const id = 649722;

    useEffect(() => {
        const getRecipeInstructions = async () => {
            try{
                setLoading(true);
                const data = await fetchRecipeInstructions(id);

                setRecipe(data);
            }catch(err){
                // console.error(err);
                setError('Failed to get recipe instructions.');
            }finally{
                setLoading(false);
            }
        };

        getRecipeInstructions();
    }, [id]);

    if(!recipe) return <h1>No result</h1>

    if(loading) return<h1>Loading...</h1>
    if(error) return <h1>{error}</h1>

    return(
        <div>
            <h1>{recipe.name}</h1>
            {recipe.steps.map((step) => (
                <p key={step.number}>{step.step}</p>
            ))}
            <ul>
                {recipe.steps[0]?.ingredients.map((name => (
                    <li key={name.id}>{name.name}</li>
                )))}
            </ul>
        </div>
    );
}

export default FoodResultPage;