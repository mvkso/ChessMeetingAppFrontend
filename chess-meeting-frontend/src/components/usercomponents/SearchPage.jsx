import "../css/Reservations.scss"
import Title from "../../Title";
import React from "react";

const SearchPage = (props) => {

    return(
        <section className="search-section">
            <Title style={{fontFamily: 'Major Mono Display',color: "darkblue", fontWeight: "bold"}}>search for city - krakow</Title>
            <table className="rwd-table-search" style={{fontFamily: 'Major Mono Display'}}>
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
export default SearchPage;
