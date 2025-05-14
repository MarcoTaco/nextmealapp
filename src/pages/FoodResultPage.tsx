import React, { useState, useEffect } from 'react';
import { fetchRecipeInstructions } from '../services/SpoonacularCall.js';
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



function FoodResultPage(){
    const[recipe, setRecipe] = useState<RecipeInstructions | null>(null);
    const[loading, setLoading] = useState<boolean>(true);
    const[error, setError] = useState<string | null>(null);

    const{ user } = useAuth0();
    const[isSaved, setIsSaved] = useState<boolean>(false);

    const[savedDocId, setSavedDocId] = useState<string | null>(null);

    const location = useLocation();

    const { foodId } = useParams<{ foodId: string }>();

    const foodImage = location.state?.foodImage;
    const foodName = location.state?.foodName;

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

    // this useeffect is responsible for checking if a user has already saved the food that we are 
    // currently looking at. if it exists, change the text on the button.
    useEffect(() => {
        const checkIfSaved = async () => {
            if(!user) return;

            try{
                // searching into firebase to make sure recipe doesn't exist by looking for the user id
                // and food id.
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

    const uniqueIngredients = recipe ? getUniqueIngredients(recipe) : [];

    // im going to have to edit this function. i initially thought about storing the food id and just making an api call to grab all the information again,
    // but i was worried that would be costly with api calls. i want to store all the information onto the database, but im worried that it can make the database
    // really big really fast. and if the api updates, we wont see it on the database. 
    // what im going to do is store the foodid, image, and title of the food we saved. that way we can always have a nice display of foods we saved, and without making
    // multiple api calls. we will only make api calls when we click on an image on the user saved foods page. 

    // update: so right now, the image is working, but food name is not.
    const handleSaveClick = async (foodId: string, userId: string, foodImage: string, foodName: string) => {
        try{
            if(savedDocId && isSaved) {
                await deleteDoc(doc(db, "userSavedRecipes", savedDocId));
                setIsSaved(false);
                setSavedDocId(null);

                alert("Recipe has been removed from your saves!");
            }
            else {
                const docRef = await addDoc(collection(db, "userSavedRecipes"), {
                    foodId: foodId,
                    userId: userId,
                    foodImage: foodImage,
                    foodName: foodName,
                });
                console.log(foodImage);
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
                    <button onClick={() => handleSaveClick(foodId || "", user?.sub || "", foodImage || "", foodName || "") }>
                        { isSaved? 'Unsave Recipe' : 'Save Recipe' }
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