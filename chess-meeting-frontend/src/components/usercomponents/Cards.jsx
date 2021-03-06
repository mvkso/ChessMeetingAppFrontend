import React, {useState, useRef} from "react";


import "../css/Cards.scss";

const Cards = () => {

    return(
        <div className="cards-container"  style={{display: "flex", flexDirection: "row", fontFamily: 'Comic Sans MS'}}>
            <div className="blog-card">
                <div className="meta" >
                    <div className="photo"
                        style={{backgroundImage: `url(https://images.unsplash.com/photo-1604948501466-4e9c339b9c24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)` }}></div>
                </div>
                <div className="description">
                    <h1 style={{fontFamily: 'Major Mono Display'}}>challenge yourself</h1>
                    <h2>Play chess all over country</h2>
                    <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati
                        enim dicta praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.</p>

                </div>
            </div>
            <div className="blog-card alt">
                <div className="meta">
                    <div className="photo"
                         style={{backgroundImage: `url(https://images.unsplash.com/photo-1586165368502-1bad197a6461?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1258&q=80)` }}    ></div>
                </div>
                <div className="description">
                    <h1 style={{fontFamily: 'Major Mono Display'}}>create a community</h1>
                    <h2>Join our chess forum</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati
                        enim dicta praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.</p>

                </div>
            </div>

        </div>
    )
};
export default Cards;