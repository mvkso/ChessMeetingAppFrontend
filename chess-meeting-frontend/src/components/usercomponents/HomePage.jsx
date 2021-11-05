import React, {useState, useRef} from "react";
import { BrowserRouter, useHistory, Route, Switch} from "react-router-dom";
import "../css/HomePage.css"
import authentication from "../../scripts/authentication";
import {TextField} from "@material-ui/core";
import Title from "../../Title";
import Button from "@material-ui/core/Button";
import Cards from "./Cards";

const HomePage = () => {

    const [searchInput, setSearchInput] = useState("")

    const onChangeSearchInput = (e) => {
        const searchInput = e.target.value;
        setSearchInput(searchInput);
    };

    const handleSearch = (e) => {

    }

    return(
        <div className="home-base-container">
            <Cards/>
            <br/>
            <br/>
            <div className="home-redirection-container" style={{display: "flex", flexDirection: "row"}}>
                <div className="title-form-div">
                    <Title style={{fontFamily: 'Major Mono Display',color: "rgb(25,100,126)", fontWeight: "bold"}}>find a tournament in your city</Title>
                    <br/>
                    <br/>
                    <form className="search-form" onSubmit={handleSearch}>
                        <TextField
                            id="standard-text"
                            label="Type city"
                            type="text"
                            style ={{width: '15em'}}
                            InputLabelProps={{
                                shrink: true,}}
                            onChange={onChangeSearchInput}
                        />
                        <Button type='submit' variant={"contained"} color={"primary"} size={"small"}>search</Button>
                    </form>
                </div>
                <div className="title-form-div">
                    <Title style={{fontFamily: 'Major Mono Display',color: "rgb(25,100,126)", fontWeight: "bold"}}>create one by yourself</Title>
                    <br/>
                    <br/>
                    <form className="search-form">
                        <Button type='submit' variant={"contained"} color={"primary"} size={"large"}>create a tournament</Button>
                    </form>
                </div>

                <div className="title-form-div">
                    <Title style={{fontFamily: 'Major Mono Display',color: "rgb(25,100,126)", fontWeight: "bold"}}>see most recent tournaments</Title>
                    <br/>
                    <br/>
                </div>


            </div>





        </div>
    )


};
export default HomePage;