import React, {useState, useRef, useEffect} from "react";
import {BrowserRouter, useHistory, Route, Switch, Link, useParams} from "react-router-dom";
import authentication from "../../../scripts/authentication";
import Title from "../../../Title";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import "./../../css/Reservations.scss"
import CancelIcon from "@mui/icons-material/Cancel";
import {IconButton} from "@material-ui/core";
import axios from "axios";



const ForumTopicView = () => {

    const {id} = useParams();

    const [topic, setTopic] = useState([]);
    const [answers, setAnswers] = useState([])

    useEffect( ()=> {

        fetch(`http://localhost:8080/topic/${id}`,{ headers: authentication.authenticationHeader() })
            .then((res) => res.json())
            .then((topic) => {
                setTopic(topic);
                setAnswers(topic.answers)
                console.log(topic)
            })

    }, [])


    return(
        <section className={"reservation-section"} style={{width: "100vw", maxHeight: "100vh", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", overflowX: "scroll" }}>
                <Title style={{fontFamily: 'Major Mono Display',color: "darkblue", fontWeight: "bold", fontSize: "3em"}}>{topic.title.toLowerCase()}</Title>
                <Title style={{fontFamily: 'Major Mono Display',color: "black", fontWeight: "bold", fontSize: "1em"}}>
            {"id: "+topic.id+" author: "+topic.userDetails.firstName+" "+topic.userDetails.lastName
                +". created date: "+topic.createdDate}</Title>
                <br/>
                <div className="content-div" style={{width: "70vw", heigth: "20vw", backgroundColor: "rgb(246 247 247)", borderLeft: "4px solid rgb(58 33 187)", borderBottom: "4px solid rgb(58 33 187)",
                fontFamily: 'Calibri',color: "darkblue", fontWeight: "", fontSize: "2em"}}>
            {topic.content}
                <br/>
                <a style={{fontSize: "0.5em", float: "right", color: "black"}}>{topic.userDetails.firstName.toUpperCase()+" "+topic.userDetails.lastName.toUpperCase()+" at: "+topic.createdDate}</a>
                </div>


            <div className="answer-div">

            </div>

        </section>
    )

};
export default ForumTopicView;