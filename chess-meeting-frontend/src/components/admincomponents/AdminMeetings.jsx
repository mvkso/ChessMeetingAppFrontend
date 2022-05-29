import React, {useState, useRef, useEffect} from "react";

import "../css/Reservations.scss"
import axios from "axios";
import {IconButton, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Alert} from "@material-ui/lab";

import ConfirmationDialog from "./admindialogs/ConfirmationDialog";
import authentication from "../../scripts/authentication";

const AdminMeetings = () => {

    const [meetings, setMeetings] = useState([]);
    const [meetingId, setMeetingId] = useState(-1)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [meetingDeleted, setMeetingDeleted] = useState(null);

    const handleOk = () => {
        setDeleteDialogOpen(false);
        setMeetingDeleted(null);
        if (meetingId !== null) {
            axios.
            delete(`http://localhost:8080/reservations/${meetingId}`,{ headers: authentication.authenticationHeader() })
                // .then((res) => res.json())
                .then((result)=>{
                    if (result) {
                        if(meetingId>=0) {
                            delete meetings[meetingId];
                            setMeetings(meetings);
                            setMeetingDeleted(true);
                        }else{
                            setMeetingDeleted(false);
                        }
                    } else {
                        setMeetingDeleted(false);
                    }
                })
        }
        window.location.reload()
    };
    const handleCancel = () => {
        setDeleteDialogOpen(false);
    };

    useEffect(() => {
        if(meetings.length===0) {
            fetch(`http://localhost:8080/reservations/`,{ headers: authentication.authenticationHeader() })
                .then((res) => res.json())
                .then((details)=>{
                    setMeetings(details)
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
            <section className="reservation-section" style={{height: "100vh", maxHeight: "100vh"}}>
            <header className="admin-header" style={{marginLeft: "1em"}}>List of all events</header>
            <div style={{ marginBottom: 10 }}>
                {meetingDeleted !== null && meetingDeleted === true && <Alert severity="success">Event has been deleted.</Alert>}
                {meetingDeleted !== null && meetingDeleted === false && <Alert severity="error">Error occured. Try again!</Alert>}
            </div>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell>Subject</TableCell>
                        <TableCell>City</TableCell>
                        <TableCell>Minimum rank</TableCell>
                        <TableCell>Creator id</TableCell>
                        <TableCell>Slots</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {meetings.length > 0 ? Object.values(meetings).map((data) => (
                        <TableRow key={data.Id}>
                            <TableCell>{data.Id}</TableCell>
                            <TableCell>{data.Subject}</TableCell>
                            <TableCell>{data.cityAddress}</TableCell>
                            <TableCell>{data.minimumRank}</TableCell>
                            <TableCell>{data.userCreator}</TableCell>
                            <TableCell>{data.slotsBooked}/{data.allSlots}</TableCell>
                            <TableCell>{data.StartTime.replace('T',' ')}</TableCell>
                            <TableCell>
                                <IconButton aria-label="delete" onClick={() => {
                                    setMeetingId(data.Id);
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
export default AdminMeetings;