import React, { useState, useEffect } from 'react';
// import { fetchRecipes } from '../services/SpoonacularCall.js';

// interface Recipe{
//     id: number,
//     title: string,
//     image: string
// };

function FoodSearchPage(){    
//     const [recipes, setRecipes] = useState<Recipe[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() =>{
//         const getRecipes = async () => {
//             try{
//                 setLoading(true);
//                 const data = await fetchRecipes('chicken');
              
//                 setRecipes(data.results);
//             } catch(err){
//                 setError('Failed to get recipes');
//             } finally{
//                 setLoading(false);
//             }
//         };

//         getRecipes();
//     }, []);

//     if(loading) return <p>Loading...</p>;
//     if(error) return <p>{error}</p>;

//     return(
//         <div>
//             <h1>Recipe Search Results</h1>
//             <ul>
//                 {recipes.map((recipe) => (
//                     <li key={recipe.id}>
//                         <h3>{recipe.title}</h3>
//                         <img src={recipe.image} alt={recipe.title}></img>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
    return(
        <>
            <h2>test</h2>
        </>
    );
}

export default FoodSearchPage;