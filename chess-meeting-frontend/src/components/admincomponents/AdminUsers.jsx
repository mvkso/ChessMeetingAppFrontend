import React, {useState, useRef, useEffect} from "react";

import axios from "axios";
import {IconButton, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Alert} from "@material-ui/lab";

import ConfirmationDialog from "./admindialogs/ConfirmationDialog";
import Pagination from "../../Pagination";
import authentication from "../../scripts/authentication";

const AdminUsers = () => {

    const [users, setUsers] = useState([]);
    const [userDetailsId, setUserDetailsId] = useState(-1)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [usersDeleted, setUsersDeleted] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages,setTotalPages]=useState(0)
    const handlePages = (updatePage) => {

        fetch(`http://localhost:8080/userDetails/page/${updatePage-1}`,{ headers: authentication.authenticationHeader() })
            .then((res) => res.json())
            .then((details)=>{

                setUsers(details)

            })
        setPage(updatePage);
    }

    const handleOk = () => {
        setDeleteDialogOpen(false);
        setUsersDeleted(null);
        if (userDetailsId !== null) {
            axios.
            delete(`http://localhost:8080/userDetails/${userDetailsId}`,{ headers: authentication.authenticationHeader() })
                // .then((res) => res.json())
                .then((result)=>{
                    if (result) {
                        if(userDetailsId>=0) {
                            delete users[userDetailsId];
                            setUsers(users);
                            setUsersDeleted(true);
                            fetch(`http://localhost:8080/userDetails/page/${page-1}`,{ headers: authentication.authenticationHeader() })
                                .then((res) => res.json())
                                .then((em)=>{
                                    if(em.length===0){
                                        if(page>1){
                                            fetch(`http://localhost:8080/userDetails/page/${page-2}`,{ headers: authentication.authenticationHeader() })
                                                .then((res) => res.json())
                                                .then((employees)=>{
                                                    console.log(employees)
                                                    setUsers(employees)
                                                })
                                            setPage(page-1);
                                            setTotalPages(totalPages-1)
                                        }
                                        else{
                                            setUsers(em)
                                        }
                                    }
                                    else{
                                        setUsers(em);
                                    }
                                    console.log(em)
                                    setUsers(em)
                                })
                        }else{
                            setUsersDeleted(false);
                        }
                    } else {
                        setUsersDeleted(false);
                    }
                })
        }
    };
    const handleCancel = () => {
        setDeleteDialogOpen(false);
    };

    useEffect(() => {
        if(users.length===0) {
            fetch(`http://localhost:8080/userDetails/`,{ headers: authentication.authenticationHeader() })
                .then((res) => res.json())
                .then((details)=>{
                    setTotalPages(Math.ceil(details.length/10));
                    console.log("ilosc pracownikow: "+details.length)
                    console.log("Rozmiar: "+Math.ceil(details.length/2))
                })
            fetch(`http://localhost:8080/userDetails/page/${page-1}`,{ headers: authentication.authenticationHeader() })
                .then((res) => res.json())
                .then((details)=>{
                    setUsers(details)
                })
        }
        console.log(users)
    },[]);

    const pagination= () =>{
        if(totalPages>1)
            return <Pagination
                page={page}
                totalPages={totalPages}
                handlePagination={handlePages}
            />
    }


    return(
        <React.Fragment hei>
            <ConfirmationDialog
                message="Are you sure to delete?"
                open={deleteDialogOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
            />
            <section style={{height: "100vh"}}>
            <header className="admin-header">List of all users</header>
            <div style={{ marginBottom: 10 }}>
                {usersDeleted !== null && usersDeleted === true && <Alert severity="success">User has been deleted.</Alert>}
                {usersDeleted !== null && usersDeleted === false && <Alert severity="error">Error occured. Try again!</Alert>}
            </div>

            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>User ID</TableCell>
                        <TableCell>UD ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Last name</TableCell>
                        <TableCell>E-mail</TableCell>
                        <TableCell>Phone number</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.length > 0 ? Object.values(users).map((userDetails) => (
                        <TableRow key={userDetails.userDetailsId}>
                            <TableCell>{userDetails.user.userId}</TableCell>
                            <TableCell>{userDetails.userDetailsId}</TableCell>
                            <TableCell>{userDetails.firstName}</TableCell>
                            <TableCell>{userDetails.lastName}</TableCell>
                            <TableCell>{userDetails.user.email}</TableCell>
                            <TableCell>{userDetails.phoneNumber}</TableCell>
                            <TableCell>
                                <IconButton aria-label="delete" onClick={() => {
                                    setUserDetailsId(userDetails.userDetailsId);
                                    setDeleteDialogOpen(true);
                                }}>
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    )) : null}
                </TableBody>
            </Table>
            <br/>
            <br/>
            <br/>
            <div className="container">{pagination()}</div>
            </section>
        </React.Fragment >
    );
};
export default AdminUsers;