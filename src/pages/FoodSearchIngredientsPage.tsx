import React, { useState, useEffect } from 'react';
import { fetchRecipesWhole } from '../services/SpoonacularCall.js';
import SearchFoodBtn from '../components/SearchFoodBtn.js';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/FoodSearchPage.scss';

interface WholeRecipe{
    id: number,
    title: string,
    image: string
};


function FoodSearchIngredientsPage(){
    const [searchText, setSearchText] = useState<string>("");

    const [recipes, setRecipes] = useState<WholeRecipe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    // new stuff
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query') || '';

     // this is for grabbing the list of ingredients that we have from the home screen
    const { ingredients } = location.state || { ingredients: []};

    useEffect(() =>{
        const getRecipes = async () => {
            try{
                setLoading(true);
                const data = await fetchRecipesWhole(query);
              
                setRecipes(data.results);
            } catch(err){
                setError('Failed to get recipes');
            } finally{
                setLoading(false);
            }
        };

        getRecipes();
    }, []);

    const navigate = useNavigate();

    // this function is for when we click on an image to map their id to the recipe page, as well as the list of the ingredients
    // we have.
    function handleImageClick(foodId: number, foodImage: string){
        navigate(`/recipe-with-ingredients/${foodId}`, { state: { foodImage, ingredients }});
    }

    // in here goes the search text for searching foods. but by the filter stuff
    function handleSearchText(){

    }
    function clickSearch(){

    }

    if(loading) return <p>Loading...</p>;
    if(error) return <p>{error}</p>;

    return(
        <div>
            <h1>Recipe Search Results</h1>
            <div className="result-section">
                <div className="result-filter-section">
                    <SearchFoodBtn />
                    <form className="searchForm">
                        {/* 
                            filter by (list of ingredients matching, favorites, personal, more if i think of any)
                            
                            i think that's it for now. i can go back if i want to add anything.
                        */}
                        <label>
                            <input type="checkbox" value="American" /> American
                        </label>
                        <label>
                            <input type="checkbox" value="Indian" /> Indian
                        </label>
                        <label>
                            <input type="checkbox" value="Asian" /> Asian
                        </label>
                        <label>
                            <input type="checkbox" value="Italian" /> Italian
                        </label>
                        <label>
                            <input type="checkbox" value="French" /> French
                        </label>
                    </form>
                </div>
                <div className="result-grid">
                    {recipes.map((recipe) => (
                        <div className="result" data-id={ recipe.id }>
                            <img src={ recipe.image } onClick={() => (handleImageClick( recipe.id, recipe.image ))} alt={ recipe.title } data-id={ recipe.id }></img>
                            <p>{ recipe.title }</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FoodSearchIngredientsPage;