import React, {useState, useRef, useEffect} from "react";
import {BrowserRouter, useHistory, Route, Switch, Link, useParams} from "react-router-dom";
import authentication from "../../../scripts/authentication";
import Title from "../../../Title";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import categories from "../../../scripts/categories";
import "./../../css/Reservations.scss"
import CancelIcon from "@mui/icons-material/Cancel";
import {IconButton} from "@material-ui/core";
import Button from "@material-ui/core/Button";




const ForumCategoriesView = () => {

    const history = useHistory();
    const {category} = useParams();

    const [forumTopics, setForumTopics] = useState([])


    useEffect( ()=> {

        fetch(`http://localhost:8080/topics/${category}`,{ headers: authentication.authenticationHeader() })
            .then((res) => res.json())
            .then((topics) => {
                setForumTopics(topics);
                console.log(forumTopics)
            })
    }, [])

    return(
        <section className={"reservation-section"} style={{width: "100vw", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", overflowX: "scroll" }}>
            {forumTopics.length === 0 ? <Title style={{fontFamily: 'Major Mono Display',color: "darkblue", fontWeight: "bold"}}>
                sorry, looks like there are no posts in this category right now </Title>  : null}
            <table className="rwd-table" style={{fontFamily: 'Major Mono Display',width: "70vw"}}>
                <tr>
                    <th>id</th>
                    <th>category</th>
                    <th>title</th>
                    <th>creator</th>
                    <th>created date</th>
                    <th>answers</th>
                    <th>open</th>
                </tr>
                {forumTopics.map((data) => {

                    return(
                        <tr style={{background: "#38345e", color: "gold", fontWeight: "bold"}}>
                            <td  data-th="id">{data.id}</td>
                            <td data-th="category">{data.category.toLowerCase()}</td>
                            <td data-th="title">{data.title.toLowerCase()}</td>
                            <td data-th="name">{data.userDetails.firstName.toLowerCase()} {data.userDetails.lastName.toLowerCase()}</td>
                            <td data-th="date">{data.createdDate}</td>
                            <td data-th="date">{data.answersCount}</td>
                            <td data-th={"action"}>
                                <IconButton aria-label="edit">
                                    <ArrowForwardIosIcon color={"white"} style={{color: "white"}} onClick={() =>{
                                        history.push(`/forum/topic/${data.id}`)
                                    } }/>
                                </IconButton></td>
                        </tr>
                    );
                })}

            </table>




        </section>
    );

};
export default ForumCategoriesView;