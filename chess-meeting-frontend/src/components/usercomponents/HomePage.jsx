import React, {useState, useRef} from "react";
import { BrowserRouter, useHistory, Route, Switch} from "react-router-dom";
import "../css/HomePage.css"
import authentication from "../../scripts/authentication";
import {TextField} from "@material-ui/core";
import Title from "../../Title";
import Button from "@material-ui/core/Button";
import Cards from "./Cards";
import {black} from "material-ui/styles/colors";
import MyReservations from "./MyReservations";

const HomePage = () => {

    const history = useHistory();
    const [searchInput, setSearchInput] = useState("")

    const onChangeSearchInput = (e) => {
        const searchInput = e.target.value;
        setSearchInput(searchInput);
    };

    const handleSearch = (e) => {
        history.push(`/search/${searchInput}`);
    }

    const handleCreateButton = (e) => {
        history.push('/create')
    }

    return(
        <div className="home-base-container">
            <Cards/>
            <br/>
            <br/>
            <div className="home-redirection-container" style={{display: "flex", flexDirection: "row"}}>
                <div className="title-form-div">
                    <Title style={{fontFamily: 'Major Mono Display',color: "darkblue", fontWeight: "bold"}}>find a tournament in your city</Title>
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
                    <Title style={{fontFamily: 'Major Mono Display',color: "darkblue", fontWeight: "bold"}}>create one by yourself</Title>
                    <br/>
                    <br/>
                    <form className="search-form" onSubmit={handleCreateButton}>
                        <Button type='submit' variant={"contained"} color={"primary"} size={"large"}>create a tournament</Button>
                    </form>
                </div>

                <div className="title-form-div">
                    <Title style={{fontFamily: 'Major Mono Display',color: "darkblue", fontWeight: "bold"}}>see most recent tournaments</Title>
                    <table className="rwd3-table" style={{fontFamily: 'Major Mono Display', width: "30%"}}>
                        <tr>
                            <th>description</th>
                            <th>city</th>
                            <th>when</th>
                            <th>rank</th>
                            <th>slots</th>
                            <th>join</th>
                        </tr>
                        <tr>
                            <td data-th="description">turniej o nic</td>
                            <td data-th="city">bialystok</td>
                            <td data-th="when">21-02-10 11:00</td>
                            <td data-th="rank">1200</td>
                            <td data-th="slots">7/12</td>
                            <td data-th="join">clickme</td>
                        </tr>
                        <tr>
                            <td data-th="description">turniej o nic</td>
                            <td data-th="city">bialystok</td>
                            <td data-th="when">21-02-10 11:00</td>
                            <td data-th="rank">1200</td>
                            <td data-th="slots">7/12</td>
                            <td data-th="join">clickme</td>
                        </tr>

                    </table>
                </div>


            </div>





        </div>
    )


};
export default HomePage;