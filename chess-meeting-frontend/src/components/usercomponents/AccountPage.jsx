import React, {useContext, useEffect, useState} from "react";
import authentication from "../../scripts/authentication";
import {IconButton, Table, TableBody, TableCell, TableRow, TextField} from "@material-ui/core";
import {ThemeContext} from "../../Theme-context";
import {Edit} from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import {CloudUpload} from '@material-ui/icons'
import {isNullOrUndefined} from "@syncfusion/ej2-base";
import Title from "../../Title";

const AccountPage = () => {
    const history = useHistory();

    const [loggedUser, setLoggedUser] = useState(null);
    const context = useContext(ThemeContext);
    const classes = context.classes;
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [currentPassword, setCurrentPassword ] = useState("");
    const [newPassword, setNewPassword ] = useState("");
    const [confirmNewPassword, setConfirmNewPassword ] = useState("");

    const [emailChanged, setEmailChanged] = useState(null);
    const [phoneNumberChanged, setPhoneNumberChanged] = useState(null);

    const[toggleEmail, setToggleEmail] = useState(false);
    const[toggleFirstName, setToggleFirstName] = useState(false);
    const[toggleLastName, setToggleLastName] = useState(false);
    const[togglePassword, setTogglePassword] = useState(false);
    const[togglePhone, setTogglePhone] = useState(false);




    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");



    useEffect(() => {
        setLoggedUser(authentication.getCurrentUser());
        fetch(`http://localhost:8080/userDetails/userId/${authentication.getCurrentUser().id}`,{ headers: authentication.authenticationHeader() })
            .then((res) => res.json())
            .then((user) => {
                setFirstName(user.firstName);
                setLastName(user.lastName);
                setPhoneNumber(user.phoneNumber);
            })
        fetch(`http://localhost:8080/users/${authentication.getCurrentUser().id}`, { headers: authentication.authenticationHeader() })
            .then((res) => res.json())
            .then((user) => {
                setEmail(user.email)
            })
    }, []);


    const onChangeEmail = (e) => {
        const newEmail = e.target.value;
        setEmailChanged(newEmail);
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
        const phoneNumber = e.target.value;
        setPhoneNumberChanged(phoneNumber);
    };

    const onChangeCurrentPassword = (e) => {
        const temp = e.target.value;
        setCurrentPassword(temp);
    };

    const onChangeNewPassword = (e) => {
        const temp = e.target.value;
        setNewPassword(temp);
    };

    const onChangeConfirmedNewPassword = (e) => {
        const temp = e.target.value;
        setConfirmNewPassword(temp);
    };






    const handleSubmitEmail = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);



        authentication.updateEmail(authentication.getCurrentUser().id,emailChanged).then(
            (response) => {
                setMessage(response.data.message);
                setSuccessful(true);
                setToggleEmail(false);
                setTogglePassword(false);
                setEmailChanged(true);
                alert("You have to re-log in!")
                authentication.logout();
                history.push("/")
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
                setSuccessful(false);
                setToggleEmail(false);
                setTogglePassword(false);
                setEmailChanged(false);
            }
        );


        // authentication.logout();
        // history.push("/");
    }

    const handleSubmitPhoneNumber = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(null);

        authentication.updatePhoneNumber(authentication.getCurrentUser().id,phoneNumberChanged).then(
            (response) => {
                setMessage(response.data.message);
                setSuccessful(true);
                setTogglePhone(false);
                setPhoneNumber(phoneNumberChanged);
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
                setSuccessful(false);
                setTogglePhone(false);
            }
        );
    }


    const handleSubmitLastName = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(null);
        authentication.updateNameOrLastName(authentication.getCurrentUser().id,firstName,lastName).then(
            (response) => {
                setMessage(response.data.message);
                setSuccessful(true);
                setToggleLastName(false);
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
                setSuccessful(false);
                setToggleLastName(false);
            }
        );
    }

    const handleSubmitFirstName = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(null);

        authentication.updateNameOrLastName(authentication.getCurrentUser().id,firstName,lastName).then(
            (response) => {
                setMessage(response.data.message);
                setSuccessful(true);
                setToggleFirstName(false);
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
                setSuccessful(false);
                setToggleFirstName(false);
            }
        );
    }






    return(
        <section style={{height: "100vh"}}>
            <Title style={{fontFamily: 'Major Mono Display',color: "darkblue", fontWeight: "bold", marginLeft: "1em"}}>my account</Title>
            <div style={{ marginBottom: 10 }}>
                {/*{email !== authentication.getCurrentUser().email*/}
                {/*&& emailChanged === false && <Alert severity="error">{message}</Alert>}*/}

            </div>
            <Table className={classes.table} aria-label="simple table">
                <TableBody>
                    <TableRow>
                        <TableCell>Email</TableCell>
                        {!toggleEmail ?
                            <TableCell>{email}</TableCell> :
                            <TableCell>
                                <form style={{display: "flex", flexDirection: "row", alignItems: "center"}} onSubmit={handleSubmitEmail} >
                                    <TextField
                                        id="standard-text"
                                        label="Type email"
                                        type="email"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={onChangeEmail}
                                        required={isNullOrUndefined(emailChanged)}
                                        value={emailChanged}
                                        error={emailChanged === null || emailChanged === ""}
                                    />
                                    <Button
                                        type={"submit"}
                                        color="primary"
                                        startIcon={<CloudUpload />}>OK</Button>
                                </form>
                            </TableCell>
                        }
                        <IconButton aria-label="edit">
                            <Edit onClick={() =>{
                                setToggleEmail(!toggleEmail);
                            } }/>
                        </IconButton>
                    </TableRow>

                    <TableRow>
                        <TableCell>First name</TableCell>
                        {!toggleFirstName ?
                            <TableCell>{firstName}</TableCell> :
                            <TableCell>
                                <form style={{display: "flex", flexDirection: "row", alignItems: "center"}} onSubmit={handleSubmitFirstName}>
                                    <TextField
                                        id="standard-text"
                                        label="Update first name"
                                        type="text"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={onChangeFirstName}
                                        required={isNullOrUndefined(firstName)}
                                        value={firstName}
                                        error={firstName === null || firstName === ""}
                                    />
                                    <Button
                                        type={"submit"}
                                        color="primary"
                                        startIcon={<CloudUpload />}>OK</Button>
                                </form>
                            </TableCell>
                        }
                        <IconButton aria-label="edit">
                            <Edit onClick={() =>{
                                setToggleFirstName(!toggleFirstName);
                            } }/>
                        </IconButton>
                    </TableRow>

                    <TableRow>
                        <TableCell>Last name</TableCell>
                        {!toggleLastName ?
                            <TableCell>{lastName}</TableCell> :
                            <TableCell>
                                <form style={{display: "flex", flexDirection: "row", alignItems: "center"}} onSubmit={handleSubmitLastName} >
                                    <TextField
                                        id="standard-text"
                                        label="Update last name"
                                        type="text"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={onChangeLastName}
                                        required={isNullOrUndefined(lastName)}
                                        value={lastName}
                                        error={lastName === null || lastName === ""}
                                    />
                                    <Button
                                        type={"submit"}
                                        color="primary"
                                        startIcon={<CloudUpload />}>OK</Button>
                                </form>
                            </TableCell>
                        }
                        <IconButton aria-label="edit">
                            <Edit onClick={() =>{
                                setToggleLastName(!toggleLastName);
                            } }/>
                        </IconButton>
                    </TableRow>
                    <TableRow>
                        <TableCell>Phone number</TableCell>
                        {!togglePhone ?
                            <TableCell>{phoneNumber}</TableCell> :
                            <TableCell>
                                <form style={{display: "flex", flexDirection: "row", alignItems: "center"}} onSubmit={handleSubmitPhoneNumber}>
                                    <TextField
                                        id="standard-text"
                                        label="Update phone number"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={onChangePhoneNumber}
                                        error={phoneNumberChanged === null || phoneNumberChanged === ""}
                                        value={phoneNumberChanged}
                                    />
                                    <Button
                                        type={"submit"}
                                        color={"primary"}
                                        startIcon={<CloudUpload />}>OK</Button>
                                </form>
                            </TableCell>
                        }
                        <IconButton aria-label="edit">
                            <Edit onClick={() =>{
                                setTogglePhone(!togglePhone);
                            } }/>
                        </IconButton>
                    </TableRow>
                    <TableRow>
                        <TableCell>Password</TableCell>
                        {!togglePassword ?
                            <TableCell>CHANGE YOUR PASSWORD</TableCell> :
                            <TableCell>
                                <form style={{display: "flex", flexDirection: "row", alignItems: "center"}} onSubmit={console.log(1)}>
                                    <TextField
                                        id="standard-text"
                                        label="Your password"
                                        type="password"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={onChangeCurrentPassword}
                                        error={currentPassword === null || currentPassword === ""}
                                        value={currentPassword}
                                    />
                                    <TextField
                                        id="standard-text"
                                        label="New password"
                                        type="password"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={onChangeNewPassword}
                                        error={newPassword === null || newPassword === "" || newPassword.length < 5}
                                        value={newPassword}
                                    />
                                    <TextField
                                        id="standard-text"
                                        label="Confirm new password"
                                        type="password"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={onChangeConfirmedNewPassword}
                                        error={confirmNewPassword === null || confirmNewPassword !== newPassword}
                                        value={confirmNewPassword}
                                    />
                                    <Button
                                        type={"submit"}
                                        color={"primary"}
                                        startIcon={<CloudUpload />}>OK</Button>
                                </form>
                            </TableCell>
                        }
                        <IconButton aria-label="edit">
                            <Edit onClick={() =>{
                                setTogglePassword(!togglePassword);
                            } }/>
                        </IconButton>
                    </TableRow>
                </TableBody>
            </Table>
        </section>
    );


};
export default AccountPage;