import React, { useState, useEffect } from "react";
import { fetchRecipeInstructions } from "../services/SpoonacularCall.js";
import { useParams, useLocation } from "react-router-dom";
import "../styles/FoodResultsIngredientsPage.scss";

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

function FoodResultsIngredientsPage(){
    const[recipe, setRecipe] = useState<RecipeInstructions | null>(null);
    const[loading, setLoading] = useState<boolean>(true);
    const[error, setError] = useState<string | null>(null);
    
    // i imagine we'll need a way to pass id from the foodsearchpage file so we know which one to look for
    // putting random number for now.
    // const id = 649722;

    const location = useLocation();

    const { foodId } = useParams<{ foodId: string }>();

    const foodImage = location.state?.foodImage;

    // this is for grabbing the list of ingredients that we have from the home screen
    const { ingredients } = location.state || { ingredients: [] };

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


    // this function is for setting if you have those specific ingredients that you searched for on the home page
    function getIngredientsUserHas(){
        return uniqueIngredients.filter((ingredient) => ingredients.includes(ingredient));    
    }

    function getIngredientsUserNeeds(){
        return uniqueIngredients.filter((ingredient) => !ingredients.includes(ingredient));
    }

    return(
        <div className="main-recipe-results">
            <div className="recipe-results-section">
                <div className="results-header">
                    <h1>{recipe.name || 'Recipe Instructions'}</h1>
                </div>
                <div className="header-img">
                    { foodImage && <img className="food-img" src={foodImage} /> }
                </div>
                <div className="ingredients-section">
                    {recipe.steps?.map((instruction, index) => (
                        <div className="ingredient-directions">
                            <h4 className="instruction-step" key={index}>Step {instruction.number}</h4>
                            <p className="instruction-detail" key={index}>{instruction.step}</p>
                        </div>
                    ))}
                </div>
                <div className="recipe-inventory">
                    <div className="has-recipe">
                        <div className="has-header">
                            <h3>Has:</h3>
                            {getIngredientsUserHas().map((ingredient) => (
                                <p className="ingredient-has">{ ingredient }</p>
                            ))}
                        </div>
                    </div>
                    <div className="needs-recipe">
                        <div className="needs-header">
                            <h3 className="needs-header">Needs: </h3>
                            {getIngredientsUserNeeds().map((ingredient) => (
                                <p className="ingredient-need">{ingredient}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FoodResultsIngredientsPage;