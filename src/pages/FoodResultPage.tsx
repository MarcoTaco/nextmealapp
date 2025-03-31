import React, { useState, useEffect } from 'react';
import { fetchRecipeInstructions } from '../services/SpoonacularCall.js';
import { useParams, useLocation } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../services/Firebase.js';
import '../styles/FoodResultPage.scss';

interface RecipeInstructionsData{
    // ingredients are the ingredient for each step.
    ingredients:{
        id: number,
        name: string
    }[];
    // number is numbering the steps step by step, step is the instruction on what to do
    number: number,
    step: string,
}

interface RecipeInstructions {
    name: string,
    steps: RecipeInstructionsData[];
}

//this interface is what is going to be getting saved for each account
interface SavedRecipeInformation {
    foodId: string,
    foodName: string,
    foodImage?: string,
    savedAt?: Date,
    userId: string
}

const saveRecipe = async (savedRecipeInfo: SavedRecipeInformation, userId: string ) => {
    try{
        const docRef = await addDoc(collection(db, "recipes"), {
            ...savedRecipeInfo,
            userId,
            savedAt: new Date(),
        });
        
        console.log("recipe has been saved: ", docRef.id);
    } catch(error) {
        console.error('error: ', error);
    }
}

function FoodResultPage(savedRecipeInfo: SavedRecipeInformation){
    const[recipe, setRecipe] = useState<RecipeInstructions | null>(null);
    const[loading, setLoading] = useState<boolean>(true);
    const[error, setError] = useState<string | null>(null);

    const{ user, isAuthenticated } = useAuth0();
    const[isSaved, setIsSaved] = useState<boolean>(false);

    // i imagine we'll need a way to pass id from the foodsearchpage file so we know which one to look for
    // putting random number for now.
    // const id = 649722;

    const location = useLocation();

    const { foodId } = useParams<{ foodId: string }>();

    const foodImage = location.state?.foodImage;

    useEffect(() => {
        if(foodId){
            const getRecipeInstructions = async () => {
                try{
                    setLoading(true);
                    const data = await fetchRecipeInstructions(parseInt(foodId));

                    setRecipe(data);
                }catch(err){
                    // console.error(err);
                    setError('Failed to get recipe instructions.');
                }finally{
                    setLoading(false);
                }
            };
        
            getRecipeInstructions();
        }
    }, [foodId]);

    if(!recipe) return <h1>Loading...</h1>

    if(loading) return<h1>Loading...</h1>
    if(error) return <h1>{error}</h1>

    // when displaying the recipe instructions and ingredients, the ingredients will display multiple times.
    // in this function, i am creating a map so I can keep track if an ingredient exists in the map so i
    // don't show it again
    function getUniqueIngredients(recipe : RecipeInstructions){
        const ingredientsMap = new Map<number, string>();

        recipe.steps.forEach((instructions) => {
            instructions.ingredients.forEach((ingredient) => {
                if(!ingredientsMap.has(ingredient.id)){
                    ingredientsMap.set(ingredient.id, ingredient.name);
                }
            });
        });

        return Array.from(ingredientsMap.values());
    }

    const uniqueIngredients = recipe ? getUniqueIngredients(recipe) : [];

   
    
    const handleSaveClick = async () => {
        if(!isAuthenticated || !user){
            alert("Log in to start saving recipes!");
            return;
        }

        await saveRecipe(savedRecipeInfo, user.sub || "");
        setIsSaved(true);
    }

    return(
        <div className="main-recipe-results">
            <div className="recipe-results-section">
                <div className="save-button">
                    <button onClick={ handleSaveClick } value={ foodId } >
                        { isSaved? 'Saved' : 'Save Recipe'}
                    </button>
                </div>
                <div className="results-header">
                    <h1>{recipe.name || 'Recipe Instructions'}</h1>
                </div>
                <div className="header-img">
                    { foodImage && <img src={foodImage} /> }
                </div>
                <div className="ingredients-section">
                    {recipe.steps?.map((instruction, index) => (
                        <div className="ingredient-directions">
                            <h4 className="instruction-step" key={index}>Step {instruction.number}</h4>
                            <p className="instruction-detail" key={index}>{instruction.step}</p>
                        </div>
                    ))}
                </div>
                <div className="list-ingredients">
                    <div className="ingredients-header">
                        <h3>Ingredients Needed:</h3>
                    </div>
                    {uniqueIngredients.map((ingredient) => (
                        <p className="ingredients">{ingredient}</p>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FoodResultPage;