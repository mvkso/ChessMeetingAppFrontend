import React, {useContext, useEffect, useState} from "react";
import authentication from "../../scripts/authentication";
import {IconButton, Table, TableBody, TableCell, TableRow, TextField} from "@material-ui/core";
import {ThemeContext} from "../../Theme-context";
import {Link as RouterLink} from "react-router-dom";
import {Edit} from "@material-ui/icons";
import {Alert, Autocomplete} from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import {CloudUpload} from '@material-ui/icons';
import {useForm} from "react-hook-form";
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
    const [rank, setRank] = useState("");
    const [city, setCity] = useState("")
    const[toggleEmail, setToggleEmail] = useState(false);
    const[toggleFirstName, setToggleFirstName] = useState(false);
    const[toggleLastName, setToggleLastName] = useState(false);
    const[toggleRank, setToggleRank] = useState(false);
    const[toggleCity, setToggleCity] = useState(false);



    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const { register, handleSubmit, errors, setError, reset } = useForm();


    useEffect(() => {
        setLoggedUser(authentication.getCurrentUser());
        fetch(`http://localhost:8080/userDetails/userId/${authentication.getCurrentUser().id}`,{ headers: authentication.authenticationHeader() })
            .then((res) => res.json())
            .then((user) => {
                setFirstName(user.firstName);
                setLastName(user.lastName);
            })
        fetch(`http://localhost:8080/users/${authentication.getCurrentUser().id}`, { headers: authentication.authenticationHeader() })
            .then((res) => res.json())
            .then((user) => {
                setEmail(user.email)
            })
    }, []);


    const onChangeEmail = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
    };

    const onChangeFirstName = (e) => {
        const temp = e.target.value;
        setFirstName(temp);
    };

    const onChangeLastName = (e) => {
        const temp = e.target.value;
        setLastName(temp);
    };

    const onChangeCity = (e) => {
        const temp = e.target.value;
        setCity(temp);
    };

    const onChangeRank = (e) => {
        const temp = e.target.value;
        setRank(temp);
    };

    //
    //
    // const handleSubmitEmail = (e) => {
    //     e.preventDefault();
    //
    //     setMessage("");
    //     setSuccessful(false);
    //
    //
    //
    //     authentication.updateEmail(authentication.getCurrentUser().id,email+postfix).then(
    //         (response) => {
    //             setMessage(response.data.message);
    //             setSuccessful(true);
    //             setToggleEmail(false);
    //             setTogglePassword(false);
    //             setEmailChanged(true);
    //             alert("You have to re-log in!")
    //             authentication.logout();
    //             window.location.reload();
    //         },
    //         (error) => {
    //             const resMessage =
    //                 (error.response &&
    //                     error.response.data &&
    //                     error.response.data.message) ||
    //                 error.message ||
    //                 error.toString();
    //             setMessage(resMessage);
    //             setSuccessful(false);
    //             setToggleEmail(false);
    //             setTogglePassword(false);
    //             setEmailChanged(false);
    //         }
    //     );
    //
    //
    //     // authentication.logout();
    //     // history.push("/");
    // }
    //




    //     authentication.updateRegion(authentication.getCurrentUser().id,region).then(
    //         (response) => {
    //             setMessage(response.data.message);
    //             setSuccessful(true);
    //             setToggleRegion(false);
    //             setTogglePassword(false);
    //             setRegionChanged(true);
    //         },
    //         (error) => {
    //             const resMessage =
    //                 (error.response &&
    //                     error.response.data &&
    //                     error.response.data.message) ||
    //                 error.message ||
    //                 error.toString();
    //             setMessage(resMessage);
    //             setSuccessful(false);
    //             setToggleRegion(false);
    //             setTogglePassword(false);
    //             setRegionChanged(false);
    //         }
    //     );
    //
    //
    // }

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
                                <form style={{display: "flex", flexDirection: "row", alignItems: "center"}} /*onSubmit={handleSubmitEmail} */>
                                    <TextField
                                        id="standard-text"
                                        label="Type email"
                                        type="text"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={onChangeEmail}
                                        required={isNullOrUndefined(email)}
                                        value={email}
                                        error={email === null || email === ""}
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
                                <form style={{display: "flex", flexDirection: "row", alignItems: "center"}} /*onSubmit={handleSubmitEmail} */>
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
                                <form style={{display: "flex", flexDirection: "row", alignItems: "center"}} /*onSubmit={handleSubmitEmail} */>
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

                </TableBody>
            </Table>
        </section>
    );


};
export default AccountPage;