import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import Authentication from "../scripts/authentication";
import "./css/SignIn.css"
import Title from "../Title";
import {Alert, Autocomplete} from "@material-ui/lab";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CheckIcon from '@mui/icons-material/Check';

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
    const [formToggle, setFormToggle] = useState(true);



    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangeState = (e) => {
        const state = !formToggle
        setFormToggle(state);
    }

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
                user.userType === "ADMIN" ? history.push("/adminPanel") : history.push("/home")
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

            <div class="login-page" style={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "-2em"}}>
                <Title style={{fontFamily: 'Major Mono Display',color: "rgb(1,56,72)",
                    fontWeight: "bold", fontSize: "2.5em", paddingBottom: "1em"}}>
                   chess meeting app</Title>
                <div className="login-banner">

                </div>
                <div class="form-login">

                    <div style={{ marginBottom: 10 }}>
                        {loggedIn !== null && loggedIn === false && <Alert severity="error">{message}</Alert>}
                    </div>
                    {formToggle === true ?
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
                        <p className="message">Don't have an account yet? <a onClick={onChangeState}>Register</a></p>
                    </form>
                        :
                    <form class="register-form" style={{display: "flex", flexDirection: "column"}}>
                        <TextField
                            id="standard-text"
                            label="Type email"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            // onChange={}

                        />
                        <TextField
                            id="standard-text"
                            label="Type name"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            // onChange={}

                        />
                        <TextField
                            id="standard-text"
                            label="Type last name"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            // onChange={}

                        />
                        <TextField
                            id="standard-text"
                            label="Type password"
                            type="password"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            // onChange={}

                        />
                        <TextField
                            id="standard-text"
                            label="Confirm password"
                            type="password"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            // onChange={}
                        />
                        <Button type='submit' >register</Button>
                        <p className="message">You have already an account? <a onClick={onChangeState}>Login</a></p>
                    </form>
                    }

                </div>
            </div>
        </section>
    );

};
export default SignUp;