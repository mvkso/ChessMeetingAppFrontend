import "../css/Reservations.scss"
import Title from "../../Title";
import React from "react";

const MyReservations = (props) => {

    return(
        <section className="reservation-section">
            <Title style={{fontFamily: 'Major Mono Display',color: "darkblue", fontWeight: "bold"}}>{props.color === "secondary" ? "your tournaments" : "your reservations"}</Title>
            <table className={props.color === "secondary" ? "rwd2-table" : "rwd-table"} style={{fontFamily: 'Major Mono Display'}}>
                <tr>
                    <th>name</th>
                    <th>place</th>
                    <th>chuj</th>
                    <th>chuj</th>
                    <th>kargul</th>
                </tr>
                <tr>
                    <td data-th="Movie Title">sram na meksykana</td>
                    <td data-th="Genre">us17</td>
                    <td data-th="Year">184010</td>
                    <td data-th="Gross">$chuj</td>
                </tr>
                <tr>
                    <td data-th="Movie Title">sram na meksykana</td>
                    <td data-th="Genre">us17</td>
                    <td data-th="Year">184010</td>
                    <td data-th="Gross">$chuj</td>
                </tr>
                <tr>
                    <td data-th="Movie Title">sram na meksykana</td>
                    <td data-th="Genre">us17</td>
                    <td data-th="Year">184010</td>
                    <td data-th="Gross">$chuj</td>
                </tr>
                <tr>
                    <td data-th="Movie Title">sram na meksykana tak</td>
                    <td data-th="Genre">us17</td>
                    <td data-th="Year">184010</td>
                    <td data-th="Gross">$chuj</td>
                </tr>
            </table>

        </section>
    );

};
export default MyReservations;
