import React, { useState, useEffect } from "react";
import { fetchRecipesInstructions } from '../services/SpoonacularCall.js';
import { useLocation } from "react-router-dom";

interface RecipeInstructions{
    name: string,
    steps:{
        ingredients:{
            name: string
        }[];
        number: number,
        step: string,
    }[];
}

function FoodResultPage(){
    const[recipeInstructions, setRecipeInstructions] = useState<RecipeInstructions>();
    const[loading, setLoading] = useState<boolean>(true);
    const[error, setError] = useState<string | null>(null);

    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query') || '';

    // i imagine we'll need a way to pass id from the foodsearchpage file so we know which one to look for
    // putting random number for now.
    const id = 1;

    useEffect(() => {
        try{
            // have to stop here. do something similar to the foodsearchpage try catch
        }
    });

    return(
        <></>
    );
}

export default FoodResultPage;