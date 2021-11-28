import "../css/Reservations.scss"
import Title from "../../Title";
import React, {useContext, useEffect, useState} from "react";
import authentication from "../../scripts/authentication";
import * as url from "url";
import {useParams} from "react-router-dom";

const MyReservations = (props) => {

    const [userDetailsId, setUserDetailsId] = useState("");
    const [timeFrom, setTimeFrom] = useState(null);
    const [timeTo, setTimeTo] = useState(null);
    const [subject, setSubject] = useState("");
    const [city, setCity] = useState("");
    const [rank, setRank] = useState(0);
    const [slotsBooked, setSlotsBooked] = useState(0);
    const [allSlots, setAllSlots] = useState(0);

    const {cityReservations} = useParams();

    const[allReservations, setAllReservations] = useState([]);
    const[userDetails, setUserDetails] = useState([]);

    useEffect( ()=> {
        let userId;
        fetch(`http://localhost:8080/userDetails/userId/${authentication.getCurrentUser().id}`,{ headers: authentication.authenticationHeader() })
            .then((res) => res.json())
            .then((userDetails1) => {
                setUserDetails(userDetails);
                fetch(`http://localhost:8080/reservations/`+(props.type === "created" ? `user/${userDetails1.userDetailsId}/created`
                    : props.type === "booked" ? `user/${userDetails1.userDetailsId}/booked` : ``),
                    { headers: authentication.authenticationHeader() })
                    .then((res) => res.json())
                    .then((reservations) => setAllReservations(reservations))
                    .then(console.log(allReservations))
            })
    }, [])

    return(
        <section className="reservation-section" style={{height: "100vh"}}>
            <Title style={{fontFamily: 'Major Mono Display',color: "darkblue", fontWeight: "bold"}}>{props.color === "secondary" ? "your tournaments" : "your reservations"}</Title>
            <table className={props.color === "secondary" ? "rwd2-table" : "rwd-table"} style={{fontFamily: 'Major Mono Display'}}>
                <tr>
                    <th>description {props.type}</th>
                    <th>city</th>
                    <th>when</th>
                    <th>rank</th>
                    <th>slots</th>
                    <th>join</th>
                </tr>
                {allReservations.map((e) => {
                    return(

                    <tr>
                        <td data-th="description">{e.subject.toLowerCase()}</td>
                        <td data-th="city">{e.cityAddress.toLowerCase()}</td>
                        <td data-th="when">{e.dateTimeFrom}</td>
                        <td data-th="rank">{e.minimumRank}</td>
                        <td data-th="slots">{e.slotsBooked}/{e.allSlots}</td>
                        <td data-th="join">clickme</td>
                    </tr>
                    );
                })}
            </table>

        </section>
    );

};
export default MyReservations;
