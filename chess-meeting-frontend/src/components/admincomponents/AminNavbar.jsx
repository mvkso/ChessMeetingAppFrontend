import React from "react";
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";
import "../css/UserNavbar.scss";

import HomeIcon from '@mui/icons-material/Home';



import authentication from "../../scripts/authentication";

const AdminNavbar = () => {


    const history = useHistory();


    return(

        <div>
            <ul className="nav-admin">
                <li className="nav-item slam-left"><Link to="/adminPanel">panel</Link></li>
                <li className="nav-item"><Link to="/admin-users">users</Link></li>
                <li className="nav-item"><Link to="/admin-meetings">meetings</Link></li>
                <li className="nav-item"><Link to="/admin-accounts">accounts</Link></li>
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
export default AdminNavbar;