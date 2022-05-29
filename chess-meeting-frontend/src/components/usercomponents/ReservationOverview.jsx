import "../css/Reservations.scss"
import React, {useEffect, useState} from "react";
import MyReservations from "./MyReservations";

const ReservationOverview = () => {

    return(
    <section className="overview-section" style={{display: "flex", flexDirection: "column", alignItems: "center", overflowX: "scroll" }}>
        <MyReservations type={"created"} />
        <br/>
        <br/>
        <MyReservations type={"booked"} color = "secondary"/>
    </section>
    );

};
export default ReservationOverview;