import React, {useState, useEffect} from "react";

import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import authentication from "../../scripts/authentication";
//import "../css/Employee.css";
import Pagination from "../../Pagination";

const Logs = () => {


    const [logs, setLogs] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages,setTotalPages]=useState(0)
    const handlePages = (updatePage) => {

        fetch(`http://localhost:8080/log/getLogs/${updatePage-1}`,{ headers: authentication.authenticationHeader() })
            .then((res) => res.json())
            .then((logs)=>{
                setLogs(logs);
            })
        setPage(updatePage);
    }

    useEffect(() => {
        if(logs.length==0) {
            fetch(`http://localhost:8080/log/getLogs/`,{ headers: authentication.authenticationHeader() })
                .then((res) => res.json())
                .then((logs)=>{
                    setTotalPages(Math.ceil(logs.length/10));
                })
            fetch(`http://localhost:8080/log/getLogs/${page-1}`,{ headers: authentication.authenticationHeader() })
                .then((res) => res.json())
                .then((logs)=>{
                    setLogs(logs)
                })
        }
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
        <section style={{height: "100vh"}}>
            <header className="admin-header">List of all logs</header>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Type</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.values(logs).map((log) => (
                        <TableRow key={log.logId}>
                            <TableCell>{log.date.replace('T', ' ')}</TableCell>
                            <TableCell>{log.description}</TableCell>
                            <TableCell>{log.logType}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <br/>
            <br/>
            <br/>
            <div className="container">{pagination()}</div>
        </section>
    );


}
export default Logs;