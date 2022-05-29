import "../css/Reservations.scss"
import Title from "../../Title";
import React, {useEffect, useState} from "react";
import authentication from "../../scripts/authentication";
import {useParams} from "react-router-dom";

import AddIcon from '@mui/icons-material/Add';
import {IconButton} from "@material-ui/core";
import BookReservation from "./userdialogs/BookReservation";

const SearchPage = (props) => {

    const {cityReservation} = useParams();

    const [selectedId, setSelectedId] = useState();
    const [selectedEventSubject, setSelectedEventSubject] = useState();
    const[allReservations, setAllReservations] = useState([]);

    const selectedReservation = allReservations.find((Id) => Id === selectedId)

    useEffect( ()=> {
        fetch(`http://localhost:8080/reservations/city/${cityReservation}/user/${authentication.getCurrentUser().id}`,{ headers: authentication.authenticationHeader() })
            .then((res) => res.json())
            .then((searchReservations) => {
                setAllReservations(searchReservations);
                console.log(sessionStorage.getItem("user"));
                console.log(allReservations)
            })
    }, [])


    const handleCancel = () => {
        setSelectedId(undefined)
        window.location.reload()

    }

    const handleOk = () => {
        return authentication.bookReservation(selectedId, authentication.getCurrentUser().id)
            .then(setSelectedId(undefined))
            .then(window.location.reload())
    }






    return(
        <React.Fragment>
            <BookReservation
            open={selectedId !== undefined}
            handleOk={handleOk}
            handleCancel={handleCancel}
            subject={selectedEventSubject}
            />
        <section className="search-section" style={{height: "100vh"}}>
            <Title style={{fontFamily: 'Major Mono Display',color: "darkblue", fontWeight: "bold"}}>search for city - {cityReservation}</Title>
            {allReservations.length === 0 ? <Title style={{fontFamily: 'Major Mono Display',color: "darkblue", fontWeight: "bold"}}>
                sorry, looks like there are no events for city {cityReservation} </Title>  : null}
            <table className="rwd-table-search" style={{fontFamily: 'Major Mono Display'}}>
                <tr>
                    <th>description</th>
                    <th>city</th>
                    <th>when</th>
                    <th>rank</th>
                    <th>slots</th>
                    <th>join</th>
                </tr>
                {allReservations.map((data) => {
                    return(

                        <tr >
                            <td data-th="description" >{data.Subject.toLowerCase()}</td>
                            <td data-th="city">{data.cityAddress.toLowerCase()}</td>
                            <td data-th="when">{data.StartTime.replace('T',' ')}</td>
                            <td data-th="rank">{data.minimumRank}</td>
                            <td data-th="slots">{data.slotsBooked}/{data.allSlots}</td>
                            <td data-th="join"><IconButton aria-label="edit">
                                <AddIcon color={"white"} style={{color: "white"}} onClick={() =>{
                                    setSelectedId(data.Id)
                                } }/>
                            </IconButton></td>
                        </tr>
                    );
                })
                }
            </table>

        </section>
                </React.Fragment>
    );

};
export default SearchPage;
