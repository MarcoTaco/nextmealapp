import React, { useState, useEffect } from 'react';
import { fetchRecipeInformation, fetchRecipeInstructions } from '../services/SpoonacularCall.js';
import { useParams, useLocation } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { addDoc, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
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



function FoodResultPage() {
    // recipe information that will display on the screen and be saved to the database
    const[recipe, setRecipe] = useState<RecipeInstructions | null>(null);
    const[recipeName, setRecipeName] = useState<string>("");
    const[recipeImage, setRecipeImage] = useState<string>("");

    // loading and error 
    const[loading, setLoading] = useState<boolean>(true);
    const[error, setError] = useState<string | null>(null);

    // checking the user
    const{ user } = useAuth0();
    
    // checking if the user has saved a recipe or not
    const[isSaved, setIsSaved] = useState<boolean>(false);

    // saving the recipe id 
    const[savedDocId, setSavedDocId] = useState<string | null>(null);

    // const location = useLocation();

    const { foodId } = useParams<{ foodId: string }>();

    // this is responsible for getting the recipe instructions
    useEffect(() => {
        if(foodId){
            const getRecipeInstructions = async () => {
                try{
                    setLoading(true);
                    const data = await fetchRecipeInstructions(parseInt(foodId));

                    setRecipe(data);
                    setRecipeName(data.name);
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

    useEffect(() => {
        if(foodId) {
            const getRecipeInformation = async () => {
                try {
                    setLoading(true);
                    const data = await fetchRecipeInformation(parseInt(foodId));

                    setRecipeName(data.title);
                    setRecipeImage(data.image);
                } catch(error) {
                    setError('Failed to get recipe information');
                } finally {
                    setLoading(false);
                }
            };

            getRecipeInformation();
        }
    }, [foodId, recipeName]);

    // this useeffect is responsible for checking if a user has already saved the food that we are 
    // currently looking at. if it exists, change the text on the button.
    useEffect(() => {
        const checkIfSaved = async () => {
            if(!user) return;

            try{
                // searching into firebase to make sure recipe doesn't exist by looking for the user id
                // and food id
                const foodExistsAlreadyQuery = query(
                    collection(db, "userSavedRecipes"),
                    where("userId", "==", user.sub),
                    where("foodId", "==", foodId)
                );
                
                const querySnapshot = await getDocs(foodExistsAlreadyQuery);
                
                if(!querySnapshot.empty) {
                    setIsSaved(true);
                    setSavedDocId(querySnapshot.docs[0].id);
                }
                else {
                    setIsSaved(false);
                    setSavedDocId(null);
                }
            }catch(err) {
                console.log("error:", err);
            }
        }

        checkIfSaved();
    }, [foodId, user]);

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

    // initializing an array of unique ingredients, or empty if none
    const uniqueIngredients = recipe ? getUniqueIngredients(recipe) : [];

    // function is responsible for handling what is getting saved when clicking on save recipe

    // TODO: update this so it's saving the food information to a singular user id 
    //      it currently is creating new rows with unique ids everytime a food is being saved. 
    const handleSaveClick = async (userId: string, foodId: string, recipeImage: string, recipeName: string ) => {
        try{
            if(savedDocId && isSaved) {
                await deleteDoc(doc(db, "userSavedRecipes", savedDocId));
                setIsSaved(false);
                setSavedDocId(null);

                alert("Recipe has been removed from your saves!");
            }
            else {
                const docRef = await addDoc(collection(db, "userSavedRecipes"), {
                    userId: userId,
                    foodId: foodId,
                    foodImage: recipeImage,
                    foodName: recipeName,
                });
                setIsSaved(true);
                setSavedDocId(docRef.id);

                alert("Recipe has been saved!");
            }
        } catch(error) {
            console.error('error: ', error);
        }
    }

    return(
        <div className="main-recipe-results">
            <div className="recipe-results-section">
                <div className="save-button">
                    <button onClick={() => handleSaveClick(user?.sub || "", foodId || "", recipeImage || "", recipeName || "") }>
                        { isSaved? 'Unsave Recipe' : 'Save Recipe' }
                    </button>
                </div>
                <div className="results-header">
                    <h1>{recipeName || 'Recipe Instructions'}</h1>
                </div>
                <div className="header-img">
                    { recipeImage && <img src={recipeImage} /> }
                </div>
                <div className="ingredients-section">
                    {recipe.steps?.map((instruction, index) => (
                        <div className="ingredient-directions">
                            {/* <h4 className="instruction-step" key={index}>Step {instruction.number}</h4>
                            <p className="instruction-detail" key={index}>{instruction.step}</p> */}
                            <h4 className="instruction-step">Step { instruction.number }</h4>
                            <p className="instruction-detail">{ instruction.step }</p>
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