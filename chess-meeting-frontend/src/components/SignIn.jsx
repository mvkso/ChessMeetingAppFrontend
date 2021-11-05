import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import Authentication from "../scripts/authentication";
import "./css/SignIn.css"
import Title from "../Title";
import {Alert, Autocomplete} from "@material-ui/lab";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const SignUp = (props) => {

    /*
    Login component.
     */

    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [loggedIn, setLoggedIn] = useState(null);



    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };
    // const getCurrentUser = () => {
    //     return JSON.parse(sessionStorage.getItem("user"));
    // };

    const handleLogin = (e) => {
        e.preventDefault();
        Authentication.login(email, password).then(
            () => {
                props.setLoggedUser(Authentication.getCurrentUser());
                const user = JSON.parse(sessionStorage.getItem('user'));
                user.userType === "ADMIN" ? history.push("/adminPanel") : history.push("/employeePanel")
                window.location.reload();

            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
                setLoggedIn(false)
                setSuccessful(false);
            }
        );
    };

    return(
        <section className="signin-section" >

            <div class="login-page">
                <div className="login-banner">

                </div>
                <div class="form-login">
                    <Title style={{fontFamily: 'Major Mono Display',color: "rgb(25,100,126)", fontWeight: "bold"}}>chess meeting app</Title>
                    <div style={{ marginBottom: 10 }}>
                        {loggedIn !== null && loggedIn === false && <Alert severity="error">{message}</Alert>}
                    </div>
                    <form class="login-form" style={{display: "flex", flexDirection: "column"}} onSubmit={handleLogin}>
                        <TextField
                            id="standard-text"
                            label="Type email"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={onChangeEmail}


                        />
                        <br/>
                        <br/>
                        <TextField
                            id="standard-text"
                            label="Type password"
                            type="password"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={onChangePassword}

                        />
                        <br/>
                        <br/>
                        <Button type='submit' >login</Button>
                        <p class="message" >Chess Meeting App - Maksymowicz Inc.</p>
                    </form>

                </div>
            </div>
        </section>
    );

};
export default SignUp;