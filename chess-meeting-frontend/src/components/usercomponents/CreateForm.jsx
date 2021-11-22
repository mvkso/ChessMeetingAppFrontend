import React,  {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";

import Authentication from "../../scripts/authentication";
import "../css/SignIn.css"
import Title from "../../Title";
import {TextField} from "@material-ui/core";
import {Alert, Autocomplete} from "@material-ui/lab";
import {isNullOrUndefined} from "@syncfusion/ej2-base";
import {wait} from "@testing-library/react";
import authentication from "../../scripts/authentication";

const CreateForm = () => {

    const history = useHistory();

    const [city, setCity] = useState("");
    const [subject, setSubject] = useState("");
    const [rank, setRank] = useState("");
    const [dateTimeFrom, setDateTimeFrom] = useState(null);
    const [dateTimeTo, setDateTimeTo] = useState(null);
    const [slots, setSlots] = useState(null);

    const [successful, setSuccessful] = useState(null);
    const [message, setMessage] = useState("");



    const onChangeCity = (e) => {
        const city = e.target.value;
        setCity(city);
    };

    const onChangeSubject = (e) => {
        const temp = e.target.value;
        setSubject(temp);
    };

    const onChangeRank = (e) => {
        const temp = e.target.value;
        setRank(temp);
    };

    const onChangeSlots = (e) => {
        const temp = e.target.value;
        setSlots(temp);
    };

    const onChangeDateTimeFrom = (e) => {
        const temp = e.target.value;
        setDateTimeFrom(temp);
    };

    const onChangeDateTimeTo = (e) => {
        const temp = e.target.value;
        setDateTimeTo(temp);

    };

    const handleCreateReservation = (e) => {
        if(dateTimeFrom != null && dateTimeTo != null){
            authentication.createMeeting(authentication.getCurrentUser().id, dateTimeFrom, dateTimeTo, subject, city,  rank, slots)
                .then((response) =>
                    {
                        setSuccessful(true);
                        setMessage("Meeting creation succeed!");

                    },
                    (error)=>{
                        setSuccessful(false)
                        setMessage("Error")
                        alert("EROR")

                    }
                )
        }else {
            setSuccessful(false)
            setMessage("Cant create a meeting")
            alert("Error cos tam")
        }

    }


    return(
        <section className="signup-section" style={{height: "100vh"}}>
            <Title style={{fontFamily: 'Major Mono Display',color: "darkblue", fontWeight: "bold", marginTop: "20px"}}>create a meeting</Title>
            <div class="login-page" style={{display: "flex", flexDirection: "column"}}>
                <div class="form-login" style={{marginTop: "-100px"}}>
                    <form class="register-form" onSubmit={handleCreateReservation} >
                        {successful === true && message !== "" && <Alert severity="success">{message}</Alert>}
                        {successful === false && message !== "" && <Alert severity="error">{message}</Alert>}
                        <div id="textFields" style={{display:"flex", flexDirection: "column"}}>
                            <TextField
                                id="standard-text"
                                label="City"
                                type="text"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant={"filled"}
                                onChange={onChangeCity}
                                value={city}
                                style={{ width: "auto" }}
                                required
                            />
                            <TextField
                                id="standard-text"
                                label="subject"
                                type="text"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant={"filled"}
                                onChange={onChangeSubject}
                                value={subject}
                                style={{ width: "auto" }}
                                required
                            />
                            <TextField
                                id="standard-number"
                                label="suggested rank"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant={"filled"}
                                onChange={onChangeRank}
                                value={rank}
                                style={{ width: "auto" }}
                                required
                            />
                            <TextField
                                id="standard-number"
                                label="slots"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant={"filled"}
                                onChange={onChangeSlots}
                                value={slots}
                                style={{ width: "auto" }}
                                required
                            />
                            <TextField
                                id="standard-number"
                                label="when"
                                type="datetime-local"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant={"filled"}
                                onChange={onChangeDateTimeFrom}
                                value={dateTimeFrom}
                                style={{ width: "auto" }}
                                required
                            />
                            <TextField
                                id="standard-number"
                                label="meeting end"
                                type="datetime-local"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant={"filled"}
                                onChange={onChangeDateTimeTo}
                                value={dateTimeTo}
                                style={{ width: "auto" }}
                                required
                            />


                        </div>
                        <br/>
                        <button id="submitButton" type='submit' style={{backgroundColor: "#5b5cff"}}>create a meeting</button>
                    </form>
                </div>
            </div>

        </section>
    );


};
export default CreateForm;
