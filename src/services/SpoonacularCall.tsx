// this file is for the different kinds of api calls i will be making
import axios, { AxiosResponse } from 'axios';

const URLWHOLEFOOD = 'https://api.spoonacular.com/recipes/complexSearch';
const URLINGREDIENTS = 'https://api.spoonacular.com/recipes/findByIngredients';

const APIKEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

// what to expect from the api response
interface WholeRecipe{
    id: number,
    title: string,
    image: string
};

interface RecipeSearchResponse{
    results: WholeRecipe[],
    offset: number,
    number: number,
    totalResults: number,
}

interface IngredientsRecipe {
    id: number,
    amount: number,
    unit: string,
    name: string,
    original: string
}
interface RecipeIngredients{
    // results: ,
}
// displaying images of foods for a "display all" page. fetch the images and titles of food based on a query
export const fetchRecipesWhole = async (query: string): Promise<RecipeSearchResponse> => {
    try{
        const response = await axios.get<RecipeSearchResponse>(URLWHOLEFOOD, {
            params: {
                apiKey: APIKEY,
                query,
            }
        });
       
        return response.data;
    }
    catch(error){
        throw new Error(`Error ${error}`);
    }
};

export const fetchRecipesIngredients = async (query: string): Promise<RecipeIngredients> => {
    try{
        const response = await axios.get<RecipeIngredients>(URLINGREDIENTS, {
            params: {
                apiKey: APIKEY
                // need to figure out how i want to add a list of ingredients.
            }
        });

        return response.data;
    }catch(error){
        throw new Error(`Error ingredients ${error}`);
    }
};