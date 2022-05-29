import React, {useState, useRef, useEffect} from "react";

import axios from "axios";
import {Button, Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Alert} from "@material-ui/lab";

import ConfirmationDialog from "./admindialogs/ConfirmationDialog";
import authentication from "../../scripts/authentication";

const AdminPosts = () => {

    const [posts, setPosts] = useState([]);
    const [postId, setPostId] = useState(-1)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [postDeleted, setPostDeleted] = useState(null);

    const handleOk = () => {
        setDeleteDialogOpen(false);
        setPostDeleted(null);
        if (postId !== null) {
            axios.
            delete(`http://localhost:8080/topic/delete`,{
                data: { topicId: postId }},
            { headers: authentication.authenticationHeader() })
                .then((result)=>{
                    if (result) {
                        if(postId>=0) {
                            delete posts[postId];
                            setPosts(posts);
                            setPostDeleted(true);
                        }else{
                            setPostDeleted(false);
                        }
                    } else {
                        setPostDeleted(false);
                    }
                })
        }
        window.location.reload()
    };
    const handleCancel = () => {
        setDeleteDialogOpen(false);
    };

    useEffect(() => {
        if(posts.length===0) {
            fetch(`http://localhost:8080/topics/all`,{ headers: authentication.authenticationHeader() })
                .then((res) => res.json())
                .then((details)=>{
                    setPosts(details)
                })
        }
    },[]);




    return(
        <React.Fragment>
            <ConfirmationDialog
                message="Are you sure to delete?"
                open={deleteDialogOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
            />
            <section style={{height: "100vh"}}>
                <header className="admin-header" style={{marginLeft: "1em"}}>List of all posts</header>
                <div style={{ marginBottom: 10 }}>
                    {postDeleted !== null && postDeleted === true && <Alert severity="success">Topic has been deleted.</Alert>}
                    {postDeleted !== null && postDeleted === false && <Alert severity="error">Error occured. Try again!</Alert>}
                </div>

                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Creator</TableCell>
                            <TableCell>Created Date</TableCell>
                            <TableCell>Answers</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posts.length > 0 ? Object.values(posts).map((data) => (
                            <TableRow key={data.id}>
                                <TableCell>{data.id}</TableCell>
                                <TableCell>{data.title}</TableCell>
                                <TableCell>{data.userDetails.firstName.toLowerCase()} {data.userDetails.lastName.toLowerCase()}</TableCell>
                                <TableCell>{data.createdDate.replace('T',' ')}</TableCell>
                                <TableCell>{data.answersCount}</TableCell>
                                <TableCell>
                                    <IconButton aria-label="delete" onClick={() => {
                                        setPostId(data.id);
                                        setDeleteDialogOpen(true);
                                    }}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )) : null}
                    </TableBody>
                </Table>
            </section>
        </React.Fragment >
    );
};
export default AdminPosts;