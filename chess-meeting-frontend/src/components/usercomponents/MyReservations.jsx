import "../css/Reservations.scss"
import Title from "../../Title";
import React, {useContext, useEffect, useState} from "react";
import authentication from "../../scripts/authentication";
import CancelIcon from '@mui/icons-material/Cancel';
import CancelReservationDialog from "./userdialogs/CancelReservationDialog";
import {IconButton} from "@material-ui/core";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import axios from "axios";

const MyReservations = (props) => {


    const [selectedId, setSelectedId] = useState();
    const [selectedEventSubject, setSelectedEventSubject] = useState();
    const [dialogMessage, setDialogMessage] = useState(props.type === "created" ? "Are you sure to delete this event?" : "Are you sure to cancel your reservation from this event?")
    const[allReservations, setAllReservations] = useState([]);
    const[userDetails, setUserDetails] = useState([]);

    const selectedReservation = allReservations.find((Id) => Id === selectedId)

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

    const handleCancel = () => {
        setSelectedId(undefined)

    }

    const handleOk = () => {
        alert(selectedId)
        return authentication.cancelOrDeleteReservation(selectedId, authentication.getCurrentUser().id)
            .then(setSelectedId(undefined))
            .then(window.location.reload())
    }
    
    const handleClickPDF= (e) => {
        authentication.getPDF(e.Id)
            .then((response) => response.blob())
            .then(blob => {
                //create blob link to download
                const url = window.URL.createObjectURL(
                    new Blob([blob]),
                );
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute(
                    'download',
                    `${e.cityAddress}-meeting.pdf`,
                );

                //Append to html link element page
                document.body.appendChild(link);
                //start download
                link.click();
                //Clean up and remove the link
                link.parentNode.removeChild(link);

            })
    }


    return(
        <React.Fragment>
            <CancelReservationDialog
                open={selectedId !== undefined}
                handleOk={handleOk}
                handleCancel={handleCancel}
                subject={selectedEventSubject}
                message={dialogMessage}
            />
        <section className="reservation-section" style={{height: "100vh"}}>
            <Title style={{fontFamily: 'Major Mono Display',color: "darkblue", fontWeight: "bold"}}>{props.color === "secondary" ? "your reservations" : "your tournaments"}</Title>
            <table className={props.color === "secondary" ? "rwd2-table" : "rwd-table"} style={{fontFamily: 'Major Mono Display'}}>
                <tr>
                    <th>description {props.type}</th>
                    <th>city</th>
                    <th>when</th>
                    <th>rank</th>
                    <th>slots</th>
                    <th>cancel</th>
                    {props.type === "created" ?
                        <th data-th="pdf">pdf</th>

                        : null}
                </tr>
                {allReservations.map((data) => {
                    return(

                    <tr>
                        <td data-th="description">{data.Subject.toLowerCase()}</td>
                        <td data-th="city">{data.cityAddress.toLowerCase()}</td>
                        <td data-th="when">{data.StartTime}</td>
                        <td data-th="rank">{data.minimumRank}</td>
                        <td data-th="slots">{data.slotsBooked}/{data.allSlots}</td>
                        <td data-th="join"><IconButton aria-label="edit">
                            <CancelIcon color={"white"} style={{color: "white"}} onClick={() =>{
                                setSelectedId(data.Id)
                            } }/>
                        </IconButton></td>
                        {props.type === "created" ?
                            <td data-th="pdf"><IconButton aria-label="edit">
                                <PictureAsPdfIcon color={"white"} style={{color: "white"}} onClick={() =>{
                                   handleClickPDF(data);
                                } }/>
                            </IconButton> </td>

                            : null}
                    </tr>
                    );
                })}
            </table>

        </section>
        </React.Fragment>
    );

};
export default MyReservations;
