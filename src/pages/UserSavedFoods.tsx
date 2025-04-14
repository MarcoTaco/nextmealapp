import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { collection, query, where, getDocs, doc } from 'firebase/firestore';

function UserSavedFoods() {
    const{ user } = useAuth0();

    

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