// this file is for the different kinds of api calls i will be making
import axios, { AxiosResponse } from 'axios';

const URLWHOLEFOOD = 'https://api.spoonacular.com/recipes/complexSearch';
const URLINGREDIENTS = 'https://api.spoonacular.com/recipes/findByIngredients';
const URLINSTRUCTIONS = 'https://api.spoonacular.com/recipes/{id}/analyzedInstructions';

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

// this interface is for what to fetch when fetching for instructions
interface RecipeInstructions{
    name: string,
    steps:{
        ingredients:{
            name: string
        }[];
        number: number,
        step: string,
    }[];
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

// this is for fetching the instructions when clicking on an image.
export const fetchRecipesInstructions = async (query: string): Promise<RecipeInstructions> => {
    try{
        const response = await axios.get<RecipeInstructions>(URLINSTRUCTIONS, {
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

// TODO: fetch recipes when only searching for foods depending on ingredients.