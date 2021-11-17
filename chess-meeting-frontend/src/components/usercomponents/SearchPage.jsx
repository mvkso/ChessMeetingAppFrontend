import "../css/Reservations.scss"
import Title from "../../Title";
import React from "react";

const SearchPage = (props) => {

    return(
        <section className="search-section" style={{height: "100vh"}}>
            <Title style={{fontFamily: 'Major Mono Display',color: "darkblue", fontWeight: "bold"}}>search for city - bialystok</Title>
            <table className="rwd-table-search" style={{fontFamily: 'Major Mono Display'}}>
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
export default SearchPage;
