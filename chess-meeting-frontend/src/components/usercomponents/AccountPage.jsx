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
    const [password, setPassword] = useState("");
    const [region, setRegion] = useState("");
    const[toggleEmail, setToggleEmail] = useState(false);
    const[togglePassword, setTogglePassword] = useState(false);
    const[toggleRegion, setToggleRegion] = useState(false);
    const [emailChanged, setEmailChanged] = useState(null);
    const [regionChanged, setRegionChanged] = useState(null);
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const [newUser, setNewUser] = useState([]);
    const [regions, setRegions] = useState([]);
    const [postfixesData, setPostfixesData] = useState([]);
    const [postfix, setPostfix] = useState("");
    const { register, handleSubmit, errors, setError, reset } = useForm();


    // useEffect(() => {
    //     setLoggedUser(authentication.getCurrentUser());
    //     fetch(`http://localhost:8080/users/${authentication.getCurrentUser().id}`,{ headers: authentication.authenticationHeader() })
    //         .then((res) => res.json())
    //         .then((admin) => {
    //             setEmail(admin.email.split('@')[0]);
    //             setPassword(admin.password);
    //             setRegion(admin.region)
    //             setPostfix("@"+admin.email.split('@')[1])
    //             fetch(`http://localhost:8080/api/auth/getRegions`, {headers: authentication.authenticationHeader()})
    //                 .then((res) => res.json())
    //                 .then((regions) => {
    //                     setRegions(regions.map((region) => region.region));
    //                     fetch(`http://localhost:8080/postfix/getAllPostfix`,{ headers: authentication.authenticationHeader() })
    //                         .then((res) => res.json())
    //                         .then((postfixesData) => {
    //                             setPostfixesData(postfixesData.map((singlePostfix) => singlePostfix.postfix));
    //                         })
    //                 })
    //         })
    // }, []);


    const onChangeEmail = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
    };


    const validatePostfix = () => {
        if(postfix===null){
            return false;
        }
        return true;
    }
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


    // const handleSubmitRegion = (e) => {
    //     e.preventDefault();
    //
    //     setMessage("");
    //     setSuccessful(false);
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
        <section>
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
                            <TableCell>email</TableCell> :
                            <TableCell>
                                <form style={{display: "flex", flexDirection: "row", alignItems: "center"}} /*onSubmit={handleSubmitEmail} */>
                                    <TextField
                                        id="standard-text"
                                        label="Type next email"
                                        type="text"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={onChangeEmail}
                                        required={isNullOrUndefined(email)}
                                        value={email}
                                        error={email === null || email === ""}
                                    />
                                    &nbsp;
                                    &nbsp;
                                    &nbsp;
                                    &nbsp;
                                    &nbsp;
                                    <Autocomplete
                                        id="combo-box-demo"
                                        popupOpen={false}
                                        options={postfixesData}
                                        style={{ width: "200px" }}
                                        renderInput={(params) => <TextField {...params} label="postfix" variant="outlined" required={isNullOrUndefined(postfix)}  error={isNullOrUndefined(postfix)}/>}
                                        onChange={(e, newValue) => {
                                            setPostfix(newValue);
                                        }}
                                        value={postfix}

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
                        <TableCell>Region</TableCell>
                        {!toggleRegion ?
                            <TableCell>nwm co</TableCell> :
                            <TableCell>
                                <form style={{display: "flex", flexDirection: "row", alignItems: "center"}} /*onSubmit={handleSubmitRegion} */>

                                    <Autocomplete
                                        id="standard-text"
                                        options={regions}
                                        style={{ width: "300px" }}
                                        renderInput={(params) => <TextField {...params} label="Region" variant="outlined" required={isNullOrUndefined(region)} error={isNullOrUndefined(region)}/>}
                                        onChange={(e, newValue) => {
                                            setRegion(newValue);
                                        }}
                                        value={region}
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
                                setToggleRegion(!toggleRegion);
                            } }/>
                        </IconButton>
                    </TableRow>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        {!toggleRegion ?
                            <TableCell>{region}</TableCell> :
                            <TableCell>
                                <form style={{display: "flex", flexDirection: "row", alignItems: "center"}} /*onSubmit={handleSubmitRegion} */>

                                    <Autocomplete
                                        id="standard-text"
                                        options={regions}
                                        style={{ width: "300px" }}
                                        renderInput={(params) => <TextField {...params} label="Region" variant="outlined" required={isNullOrUndefined(region)} error={isNullOrUndefined(region)}/>}
                                        onChange={(e, newValue) => {
                                            setRegion(newValue);
                                        }}
                                        value={region}
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
                                setToggleRegion(!toggleRegion);
                            } }/>
                        </IconButton>
                    </TableRow>
                    <TableRow>
                        <TableCell>last name</TableCell>
                        {!toggleRegion ?
                            <TableCell>{region}</TableCell> :
                            <TableCell>
                                <form style={{display: "flex", flexDirection: "row", alignItems: "center"}} /*onSubmit={handleSubmitRegion} */>

                                    <Autocomplete
                                        id="standard-text"
                                        options={regions}
                                        style={{ width: "300px" }}
                                        renderInput={(params) => <TextField {...params} label="Region" variant="outlined" required={isNullOrUndefined(region)} error={isNullOrUndefined(region)}/>}
                                        onChange={(e, newValue) => {
                                            setRegion(newValue);
                                        }}
                                        value={region}
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
                                setToggleRegion(!toggleRegion);
                            } }/>
                        </IconButton>
                    </TableRow>
                    <TableRow>
                        <TableCell>phone</TableCell>
                        {!toggleRegion ?
                            <TableCell>{region}</TableCell> :
                            <TableCell>
                                <form style={{display: "flex", flexDirection: "row", alignItems: "center"}} /*onSubmit={handleSubmitRegion} */>

                                    <Autocomplete
                                        id="standard-text"
                                        options={regions}
                                        style={{ width: "300px" }}
                                        renderInput={(params) => <TextField {...params} label="Region" variant="outlined" required={isNullOrUndefined(region)} error={isNullOrUndefined(region)}/>}
                                        onChange={(e, newValue) => {
                                            setRegion(newValue);
                                        }}
                                        value={region}
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
                                setToggleRegion(!toggleRegion);
                            } }/>
                        </IconButton>
                    </TableRow>
                    <TableRow>
                        <TableCell>city</TableCell>
                        {!toggleRegion ?
                            <TableCell>{region}</TableCell> :
                            <TableCell>
                                <form style={{display: "flex", flexDirection: "row", alignItems: "center"}} /*onSubmit={handleSubmitRegion} */>

                                    <Autocomplete
                                        id="standard-text"
                                        options={regions}
                                        style={{ width: "300px" }}
                                        renderInput={(params) => <TextField {...params} label="Region" variant="outlined" required={isNullOrUndefined(region)} error={isNullOrUndefined(region)}/>}
                                        onChange={(e, newValue) => {
                                            setRegion(newValue);
                                        }}
                                        value={region}
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
                                setToggleRegion(!toggleRegion);
                            } }/>
                        </IconButton>
                    </TableRow>
                    <TableRow>
                        <TableCell>rank</TableCell>
                        {!toggleRegion ?
                            <TableCell>{region}</TableCell> :
                            <TableCell>
                                <form style={{display: "flex", flexDirection: "row", alignItems: "center"}} /*onSubmit={handleSubmitRegion} */>

                                    <Autocomplete
                                        id="standard-text"
                                        options={regions}
                                        style={{ width: "300px" }}
                                        renderInput={(params) => <TextField {...params} label="Region" variant="outlined" required={isNullOrUndefined(region)} error={isNullOrUndefined(region)}/>}
                                        onChange={(e, newValue) => {
                                            setRegion(newValue);
                                        }}
                                        value={region}
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
                                setToggleRegion(!toggleRegion);
                            } }/>
                        </IconButton>
                    </TableRow>
                </TableBody>
            </Table>
        </section>
    );


};
export default AccountPage;