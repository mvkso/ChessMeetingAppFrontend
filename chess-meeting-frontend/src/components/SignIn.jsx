import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import Authentication from "../scripts/authentication";
import "./css/SignIn.css"
import Title from "../Title";
import {Alert} from "@material-ui/lab";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const SignUp = (props) => {

    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerConfirmedPassword, setRegisterConfirmedPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(null)


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

    const onChangeRegisterEmail = (e) => {
        const email = e.target.value;
        setRegisterEmail(email);
    };

    const onChangeRegisterPassword = (e) => {
        const temp = e.target.value;
        setRegisterPassword(temp);
    };

    const onChangeRegisterConfirmedPassword = (e) => {
        const temp = e.target.value;
        setRegisterConfirmedPassword(temp);
    };

    const onChangeFirstName = (e) => {
        const temp = e.target.value;
        setFirstName(temp);
    };

    const onChangeLastName = (e) => {
        const temp = e.target.value;
        setLastName(temp);
    };

    const onChangePhoneNumber = (e) => {
        const temp = e.target.value;
        setPhoneNumber(temp);
    }



    const handleLogin = (e) => {
        e.preventDefault();
        Authentication.login(email, password).then(
            () => {
                props.setLoggedUser(Authentication.getCurrentUser());
                const user = JSON.parse(sessionStorage.getItem('user'));
                user.userType === "ADMIN" ? history.push("/admin") : history.push("/home")
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

    const handleRegister = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);


        if(registerPassword === registerConfirmedPassword) {
            Authentication.register(registerEmail, registerPassword, registerConfirmedPassword, firstName, lastName, phoneNumber)
                .then(
                    (response) => {
                        setMessage(response.data.message);
                        setSuccessful(true);
                        setFirstName("");
                        setLastName("");
                        setRegisterEmail("");
                        setRegisterPassword("");
                        setRegisterConfirmedPassword("");

                    },
                    (error) => {
                        const resMessage =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();
                        alert("Registration failure!");
                        setMessage(resMessage);
                        setSuccessful(false);
                    }
                );}else{
            setSuccessful(false);
        }
    }

    return(
        <section className="signin-section" >

            <div class="login-page" style={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "-5em"}}>
                <Title style={{fontFamily: 'Major Mono Display',color: "rgb(1,56,72)",
                    fontWeight: "bold", fontSize: "2.5em"}}>
                   chessy™</Title>
                <div className="login-banner">
                    <Title style={{fontFamily: 'Major Mono Display',color: "white",
                        fontWeight: "bold", fontSize: "1em", marginTop: "-10px",  paddingBottom: "1em"}}>
                        be a part of chess community</Title>
                </div>
                <div class="form-login">

                    <div style={{ marginBottom: 10 }}>
                        {loggedIn !== null && loggedIn === false && <Alert severity="error">{message}</Alert>}
                    </div>
                    {formToggle === true ?
                    <form class="login-form" style={{display: "flex", flexDirection: "column"}} onSubmit={handleLogin}>
                        <TextField
                            id="standard-text"
                            label="email"
                            type="email"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={onChangeEmail}
                            value={email}

                        />
                        <br/>
                        <br/>
                        <TextField
                            id="standard-text"
                            label="password"
                            type="password"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={onChangePassword}
                            value={password}

                        />
                        <br/>
                        <br/>
                        <Button type='submit' >login</Button>
                        <p className="message">Don't have an account yet? <a onClick={onChangeState}>Register</a></p>
                    </form>
                        :
                    <form class="register-form" style={{display: "flex", flexDirection: "column"}} onSubmit={handleRegister}>
                        {successful === true && message !== "" && <Alert severity="success">{message}</Alert>}
                        {successful === false && message !== "" && <Alert severity="error">{message}</Alert>}
                        <TextField
                            id="standard-text"
                            label="email"
                            type="email"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={onChangeRegisterEmail}
                            variant={"filled"}
                            value={registerEmail}
                            error={registerEmail === null || registerEmail === ""}
                            style={{ width: "100%" }}
                            required

                        />
                        <TextField
                            id="standard-text"
                            label="name"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={onChangeFirstName}
                            variant={"filled"}
                            value={firstName}
                            style={{ width: "auto" }}
                            required

                        />
                        <TextField
                            id="standard-text"
                            label="last name"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={onChangeLastName}
                            variant={"filled"}
                            value={lastName}
                            style={{ width: "auto" }}
                            required

                        />
                        <TextField
                            id="standard-number"
                            label="phone number"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant={"filled"}
                            onChange={onChangePhoneNumber}
                            value={phoneNumber}
                            style={{ width: "auto" }}
                            required
                        />
                        <TextField
                            id="standard-text"
                            label="password"
                            type="password"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={onChangeRegisterPassword}
                            variant={"filled"}
                            value={registerPassword}
                            error={registerPassword === null || registerPassword === "" || registerPassword.length<5}
                            helperText={(registerPassword.length<5  ? 'At least 5 characters needed' : null)}
                            style={{ width: "auto" }}
                            required

                        />
                        <TextField
                            id="standard-text"
                            label="Confirm password"
                            type="password"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={onChangeRegisterConfirmedPassword}
                            variant={"filled"}
                            value={registerConfirmedPassword}
                            error={registerConfirmedPassword === null || registerConfirmedPassword === "" || registerConfirmedPassword.length<5}
                            helperText={registerPassword !== registerConfirmedPassword ? 'Passwords are different' : null}
                            style={{ width: "auto" }}
                            required
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