import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Home.scss";

function Home(){
    const [inputText, setInputText] = useState<string>("");
    const [ingredients, setIngredients] = useState<string[]>([]);

    const navigate = useNavigate();

    function handleInput(event: ChangeEvent<HTMLInputElement>){
        setInputText(event.target.value);
    }

    function handleAdd(){
        if(inputText != "" && ingredients.length < 10){
            setIngredients([...ingredients, inputText]);
        }
        else if(ingredients.length >= 5){
            setInputText("No more ingredients");
        }
        setInputText("");
    }

    function handleClear(){
        setIngredients([]);
    }
    // one more test
    function searchIngredients(e: React.FormEvent){
        e.preventDefault();
        var ingredientQueryString = '';
        
        for(let i = 0; i < ingredients.length; i++){
            ingredientQueryString += ingredients[i] + ",+";
        }
        navigate(`/food-menu-ingredients?query=${ingredientQueryString}`, { state: { ingredients }});
    }
    console.log("ingredients ", ingredients);
    return(
        <div className="home-content">
            <section className="intro-section">
                <div className="intro-txt">
                    <h3>Let's figure out your next meal!</h3>
                    <h5>Enter each ingredient in the text box and add up to 10. Click "Search" to get some new ingredients!</h5>
                </div>
                <div className="search-content">
                    <div className="search-bar">
                        <input type="text" value={inputText} onChange={handleInput} placeholder="Max 10 Ingredients"/>
                        <button onClick={handleAdd}>Add Ingredient</button>
                        <button onClick={searchIngredients}>Search</button>
                        <button onClick={handleClear}>Clear</button> 
                    </div>
                    <div className="search-display">
                        <ul>
                            {ingredients.map((text, index) => (
                                <li key={index}>{text}</li>
                            ))}
                        </ul>
                    </div>                    
                </div>
            </section>
        </div>
    )
}

export default Home;