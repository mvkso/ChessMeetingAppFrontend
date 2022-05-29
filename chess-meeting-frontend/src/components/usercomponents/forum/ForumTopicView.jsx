import React, {useState, useEffect} from "react";
import { useParams} from "react-router-dom";
import authentication from "../../../scripts/authentication";
import Title from "../../../Title";
import "./../../css/Reservations.scss"
import {Button, IconButton, TextareaAutosize} from "@material-ui/core";
import "../../css/SignIn.css"



const ForumTopicView = () => {

    const {id} = useParams();

    const [topic, setTopic] = useState([]);
    const [answers, setAnswers] = useState([])
    const [content, setContent] = useState("");
    const [successful, setSuccessful] = useState(null);
    const [message, setMessage] = useState("");

    useEffect( ()=> {

        fetch(`http://localhost:8080/topic/${id}`,{ headers: authentication.authenticationHeader() })
            .then((res) => res.json())
            .then((topic) => {
                setTopic(topic);
                setAnswers(topic.answers)
                console.log(topic)
            })

    }, [])

    const onChangeContent = (e) => {
        const temp = e.target.value;
        setContent(temp);
    };

    const handleCreateAnswer = (e) => {
        if(content !== null && content !== ""){
            authentication.addAnswer(id, authentication.getCurrentUser().id, content)
                .then((response) =>
                    {
                        setSuccessful(true);
                        setMessage("Topic creation succeed!");

                    },
                    (error)=>{
                        setSuccessful(false)
                        setMessage("Error")

                    }
                )
                .then(window.location.reload())
        }else {
            setSuccessful(false)
            setMessage("Cant create a topic")

        }

    }


    return(
        <section className={"reservation-section"} style={{width: "100vw", maxHeight: "100vh", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", overflowX: "scroll" }}>
            {topic.length !== 0 ?
                <div>
                    <Title style={{
                        fontFamily: 'Major Mono Display',
                        color: "darkblue",
                        fontWeight: "bold",
                        fontSize: "3em"
                    }}>{topic.title.toLowerCase()}</Title>
                    <Title
                        style={{fontFamily: 'Major Mono Display', color: "black", fontWeight: "bold", fontSize: "1em"}}>
                        {"id: " + topic.id + " author: " + topic.userDetails.firstName + " " + topic.userDetails.lastName
                        + ". created date: " + topic.createdDate.replace('T',' ')}</Title>
                </div>
                    : null}
                <br/>
            {topic.length !== 0 ?
                <div className="content-div" style={{
                    width: "70vw",
                    heigth: "20vh",
                    backgroundColor: "rgb(246 247 247)",
                    borderLeft: "4px solid rgb(58 33 187)",
                    borderBottom: "4px solid rgb(58 33 187)",
                    fontFamily: 'Calibri',
                    color: "darkblue",
                    fontWeight: "",
                    fontSize: "2em"
                }}>
                    {topic.content}
                    <br/>
                    <a style={{
                        fontSize: "0.5em",
                        float: "right",
                        color: "black"
                    }}>{topic.userDetails.firstName.toUpperCase() + " " + topic.userDetails.lastName.toUpperCase() + " on: " + topic.createdDate.replace('T',' ')}</a>
                </div>
            : null}
            <br/>
            <form class="register-form" onSubmit={handleCreateAnswer}  style={{display:"flex", flexDirection: "row"}}>
                <div id="textFields" style={{display:"flex", flexDirection: "row", width: ""}}>
                <TextareaAutosize
                    fullWidth
                    id="standard-text"
                    label="Content"
                    placeholder={"Type a comment"}
                    type="text"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant={"filled"}
                    onChange={onChangeContent}
                    value={content}
                    minRows={2}
                    style={{width: "60vw", borderRadius: "5px"}}

                    required
                />
                </div>
                <Button type={"submit"} color={"primary"} variant={"contained"}  style={{width: "10vw"}}>add comment</Button>

            </form>

            {answers.length !== 0 ?
                answers.map((data) =>{
                    return(

                    <div className="answers-div" style={{
                        width: "70vw",
                        heigth: "15vh",
                        backgroundColor: "purple",
                        borderBottom: "4px solid rgb(0,0,0)",
                        borderRight: "4px solid rgb(0,0,0)",
                        fontFamily: 'Calibri',
                        color: "gold",
                        fontWeight: "",
                        fontSize: "1.5em",
                        textAlign: "right",
                        borderRadius: "5px",
                        marginTop: "5px"
                    }}>
                        {data.content}
                        <br/>
                        <a style={{
                            fontSize: "0.5em",
                            float: "left",
                            color: "white",
                            marginLeft: "5px"
                        }}>{"Commented on: " + data.createdDate.replace('T',' ')}</a>
                    </div>
                    )})

                : <a></a>}





            <div className="answer-div">

            </div>

        </section>
    )

};
export default ForumTopicView;