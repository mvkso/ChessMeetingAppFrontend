import "../css/Reservations.scss"
import Title from "../../Title";
import React from "react";

const MyReservations = (props) => {

    return(
        <section className="reservation-section" style={{height: "100vh"}}>
            <Title style={{fontFamily: 'Major Mono Display',color: "darkblue", fontWeight: "bold"}}>{props.color === "secondary" ? "your tournaments" : "your reservations"}</Title>
            <table className={props.color === "secondary" ? "rwd2-table" : "rwd-table"} style={{fontFamily: 'Major Mono Display'}}>
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

        </section>
    );

};
export default MyReservations;
