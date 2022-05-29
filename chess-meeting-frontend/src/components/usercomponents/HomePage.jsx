import React, {useState, useRef, useEffect} from "react";
import { BrowserRouter, useHistory, Route, Switch} from "react-router-dom";
import "../css/HomePage.css"
import authentication from "../../scripts/authentication";
import {IconButton, TextField} from "@material-ui/core";
import Title from "../../Title";
import Button from "@material-ui/core/Button";
import Cards from "./Cards";

const HomePage = () => {

    const history = useHistory();
    const [searchInput, setSearchInput] = useState("")
    const [recentReservations, setRecentReservations] = useState([])

    useEffect( ()=> {
        fetch(`http://localhost:8080/reservations/recent/`,{ headers: authentication.authenticationHeader() })
            .then((res) => res.json())
            .then((recentData) => {
                setRecentReservations(recentData);
            })
    }, [])


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

            <div className="home-redirection-container" style={{display: "flex", flexDirection: "row", height: "100vw"}}>

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
                        <Button type='submit' variant={"contained"} color={"primary"} size={"large"}>create an event</Button>
                    </form>
                </div>

                <div className="title-form-div">
                    <Title style={{fontFamily: 'Major Mono Display',color: "darkblue", fontWeight: "bold"}}>check upcoming events</Title>
                    <table className="rwd-table" style={{fontFamily: 'Major Mono Display', width: "40vw"}}>
                        <tr>
                            <th>description</th>
                            <th>city</th>
                            <th>when</th>
                            <th>rank</th>
                            <th>slots</th>
                        </tr>
                        {recentReservations.map((data) => {
                            return(

                                <tr>
                                    <td data-th="description" >{data.Subject.toLowerCase()}</td>
                                    <td data-th="city">{data.cityAddress.toLowerCase()}</td>
                                    <td data-th="when">{data.StartTime.replace('T',' ')}</td>
                                    <td data-th="rank">{data.minimumRank}</td>
                                    <td data-th="slots">{data.slotsBooked}/{data.allSlots}</td>
                                </tr>
                            );
                        })
                        }

                    </table>
                </div>


            </div>





        </div>
    )


};
export default HomePage;