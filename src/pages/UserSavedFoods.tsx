import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { collection, query, where, getDocs, doc } from 'firebase/firestore';
import { db } from '../services/Firebase.js';

function UserSavedFoods() {
    const{ user } = useAuth0();

    const[foods, setFoods] = useState<string[]>([]);

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
                    console.log("here");
                    const foods = dbQuerySnapshot.docs.map((results) => results.data().foodId);
                    setFoods(foods);
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
            {/* {recipes.map() => (
                <div className="food-information">
                    <div className="food-image">
                        <img />
                    </div>
                    <div className="food-name">
                        <h4></h4>
                    </div>
                </div>
            )} */}
        </div>
       </div>
    );
}

export default UserSavedFoods;