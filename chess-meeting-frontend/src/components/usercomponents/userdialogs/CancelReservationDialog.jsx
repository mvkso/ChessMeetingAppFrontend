import Button from '@material-ui/core/Button';
import React, {useEffect, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import authentication from "../../../scripts/authentication";

export default function CancelReservationDialog(props) {

    const {open, handleCancel, handleOk, currentEventSubject, message} = props;
    const [user, setUser] = useState(sessionStorage.getItem("user"));


    return(
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="m"
            aria-labelledby="confirmation-dialog-title"
            open={open}>
            <DialogTitle id="confirmation-dialog-title">{message}</DialogTitle>
            <DialogActions>
                <Button color="primary" onClick={handleOk}>Yes</Button>
                <Button color="primary" onClick={handleCancel}>Cancel</Button>
            </DialogActions>

        </Dialog>
    )



};