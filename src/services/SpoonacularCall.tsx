// this file is for the different kinds of api calls i will be making
import axios, { AxiosResponse } from 'axios';

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

// this interface is for what to fetch when fetching for instructions
interface RecipeInstructionsData{
    ingredients:{
        id: number,
        name: string
    }[];
    number: number,
    step: string,
}
interface RecipeInstructions{
    name: string,
    steps: RecipeInstructionsData[];
}

// displaying images of foods for a "display all" page. fetch the images and titles of food based on a query
export const fetchRecipesWhole = async (query: string): Promise<RecipeSearchResponse> => {
    const URLWHOLEFOOD = 'https://api.spoonacular.com/recipes/complexSearch';

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
export const fetchRecipeInstructions = async (id: number): Promise<RecipeInstructions> => {
    const URLINSTRUCTIONS = `https://api.spoonacular.com/recipes/${id}/analyzedInstructions`;

    try{
        const response = await axios.get<{name: string; steps: RecipeInstructionsData[]}[]>(URLINSTRUCTIONS, {
            params: {
                apiKey: APIKEY,
                // need to figure out how i want to add a list of ingredients.
            }
        });

        return response.data[0];
    }catch(error){
        throw new Error(`Error ingredients ${error}`);
    }
};

// TODO: fetch recipes when only searching for foods depending on ingredients.