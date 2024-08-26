// this file is for the different kinds of api calls i will be making
import axios, { AxiosResponse } from 'axios';

const URL = 'https://api.spoonacular.com/recipes/complexSearch';
const APIKEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

// what to expect from the api response
interface Recipe{
    id: number,
    title: string,
    image: string
};

interface RecipeSearchResponse{
    results: Recipe[],
    offset: number,
    number: number,
    totalResults: number,
}

// displaying images of foods for a "display all" page. fetch the images and titles of food based on a query
export const fetchRecipes = async (query: string): Promise<RecipeSearchResponse> => {
    try{
        const response = await axios.get<RecipeSearchResponse>(URL, {
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