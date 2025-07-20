import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { collection, query, where, getDocs, doc } from 'firebase/firestore';
import { db } from '../services/Firebase.js';
import '../styles/UserSavedFoods.scss';

type SavedRecipe = {
    foodId: string;
    foodName: string;
    foodImage: string;
};

function UserSavedFoods() {
    const{ user } = useAuth0();

    // const[foodIds, setFoodIds] = useState<string[]>([]);
    // const[foodNames, setFoodNames] = useState<string[]>([]);
    // const[foodPics, setFoodPics] = useState<string[]>([]);
    const[showRecipes, setShowRecipes] = useState<SavedRecipe[]>([]);

    // this useEffect is for querying the saved foods depending on which user is logged in
    useEffect(() => {
        const grabUserSavedFoods = async () => {
            if(!user) {
                return;
            }

            try{
                // query for grabbing everything in the firebase database "where" userid from profile matches
                // userid on firebase.
                const dbQuery = query(
                    collection(db, "userSavedRecipes"),
                    where("userId", "==", user.sub),
                );

                const dbQuerySnapshot = await getDocs(dbQuery);
                
                // if query is not empty, map the results 
                if(!dbQuerySnapshot.empty) {
                    const showRecipesData = dbQuerySnapshot.docs.map((results) => {
                        return {
                            foodId: results.data().foodId,
                            foodName: results.data().foodName,
                            foodImage: results.data().foodImage,
                        };
                    });

                    setShowRecipes(showRecipesData);
                }
                else{
                    console.log("query is empty");
                }
            }catch(err) {
                console.log("error: ", err);
            }
        }

        grabUserSavedFoods();
    }, [user]);
    
    return(
       <div className="saved-foods-results-section">
        <div className="saved-foods-header">
            <h1>Name's Saved Foods</h1>
        </div>
        <div className="saved-foods-results">
            {showRecipes.map((recipe) => (
                <div className="food-result">
                    <div className="food-image">
                        <img src={ recipe.foodImage } />
                    </div>
                    <div className="food-name">
                        <h3>{ recipe.foodName }</h3>
                    </div>
                </div>
            ))}
        </div>
       </div>
    );
}

export default UserSavedFoods;