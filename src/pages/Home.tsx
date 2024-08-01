import React from 'react';
import "../styles/Home.scss";

function Home(){
    return(
        <div className="home-content">
            <section className="intro-section">
                <div className="intro-txt">
                    <h3>Let's figure out your next meal!</h3>
                </div>
                <div className="search-content">
                    <div className="search-bar">
                        <input name="ingredients-list" placeholder="Enter a max of 5 ingredients."/>
                    </div>
                    <div className="search-buttons">
                    
                    </div>                    
                </div>
            </section>
        </div>
    )
}

export default Home;