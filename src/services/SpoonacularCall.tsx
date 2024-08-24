import React from 'react';
import axios, { AxiosResponse } from 'axios';

//url to getting simple recipe results. just to get it to work for now
const URL = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=';
const APIKEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

// axios instance base configuration
const axiosInstance = axios.create({
    url: URL,
    params: {
        apiKey: APIKEY,
    },
});

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
    totalResults: number
}

// fetch recipes based on a query
export const fetchRecipes = async (query: string): Promise<RecipeSearchResponse> => {
    try{
        const response: AxiosResponse<RecipeSearchResponse> = await axiosInstance.get('&query=',{
            params: {
                query,
            },
        });
        return response.data;
    }
    catch(error){
        throw new Error(`Error ${error}`);
    }
};

// fetch recipes details by ID
export const fetchRecipeDetails = async (id: string): Promise<Recipe> => {
    try{
        const response: AxiosResponse<Recipe> = await axiosInstance.get(`/recipes/${id}/information`);

        return response.data;
    }
    catch(error){
        throw new Error(`Error here ${error}`);
    }
};