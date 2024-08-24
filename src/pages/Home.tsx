import React, { ChangeEvent, useState } from 'react';
import "../styles/Home.scss";

function Home(){
    const [inputText, setInputText] = useState<string>("");
    const [ingredients, setIngredients] = useState<string[]>([]);

    function handleInput(event: ChangeEvent<HTMLInputElement>){
        setInputText(event.target.value);
    }

    function handleAdd(){
        if(inputText != "" && ingredients.length < 5){
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
    
    return(
        <div className="home-content">
            <section className="intro-section">
                <div className="intro-txt">
                    <h3>Let's figure out your next meal!</h3>
                </div>
                <div className="search-content">
                    <div className="search-bar">
                        <input type="text" value={inputText} onChange={handleInput} placeholder="Max 5 Ingredients"/>
                        <button onClick={handleAdd}>Add Ingredient</button>
                        <button>Search</button>
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