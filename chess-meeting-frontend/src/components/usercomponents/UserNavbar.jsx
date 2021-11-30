import React from "react";
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";
import "../css/UserNavbar.scss";

import HomeIcon from '@mui/icons-material/Home';



import authentication from "../../scripts/authentication";

const UserNavbar = () => {


    const history = useHistory();


    return(

        <div className="navbar-div">
            <ul className="nav-user">
                <li className="nav-item slam-left"><Link to="/home">home</Link></li>
                <li className="nav-item"><Link to="/calendar">calendar</Link></li>
                <li className="nav-item"><Link to="/reservations">reservations</Link></li>
                <li className="nav-item"><Link to="/account">account</Link></li>
                <li className="nav-item"><Link className="logout-link" to="/"
                                               onClick={ () => {
                                                   authentication.logout();
                                                   history.push("/");
                                                   window.location.reload();

                                               }}>logout</Link></li>
            </ul>
        </div>
    );

};
export default UserNavbar;