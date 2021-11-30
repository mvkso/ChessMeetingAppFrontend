import "../css/Reservations.scss"
import Title from "../../Title";
import React, {useEffect, useState} from "react";
import authentication from "../../scripts/authentication";
import {useParams} from "react-router-dom";

import AddIcon from '@mui/icons-material/Add';
import {Edit} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";
import MyReservations from "./MyReservations";

const ReservationOverview = () => {

    return(
    <section className="overview-section" style={{display: "flex", flexDirection: "column", alignItems: "center", overflowX: "scroll" }}>
        <MyReservations type={"created"} />
        <MyReservations type={"booked"} color = "secondary"/>
    </section>
    );

};
export default ReservationOverview;