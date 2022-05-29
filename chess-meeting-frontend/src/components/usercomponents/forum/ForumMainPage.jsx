import React from "react";
import {useHistory} from "react-router-dom";
import Title from "../../../Title";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import categories from "../../../scripts/categories";
import "./../../css/Reservations.scss"
import {IconButton} from "@material-ui/core";
import Button from "@material-ui/core/Button";




const ForumMainPage = () => {

    const history = useHistory();


    const handleCreateButton = (e) => {
        history.push('/forum/create-topic')
    }

    const handleLinkToMyTopics = (e) => {
        history.push('/forum/my-topics')
    }

    const handleLinkToLatestTopics = (e) => {
        history.push('forum/recent')
    }

    return(
        <section className={"reservation-section"} style={{width: "100vw", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", overflowX: "scroll" }}>
            <Title style={{fontFamily: 'Major Mono Display',color: "darkblue", fontWeight: "bold"}}>Welcome to chess forum</Title>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <form className="search-form" onSubmit={handleCreateButton}>
                        <Button type='submit' variant={"contained"} color={"primary"} size={"large"}>create a topic</Button>
                    </form>
                    &nbsp;
                    <form className="search-form" onSubmit={handleLinkToMyTopics}>
                        <Button type='submit' variant={"contained"} color={"secondary"} size={"large"}>see your topics</Button>
                    </form>
                    &nbsp;
                    <form className="search-form" onSubmit={handleLinkToLatestTopics}>
                        <Button type='submit' variant={"contained"} color={"primary"} size={"large"}>see latest topics</Button>
                    </form>
                </div>

            <table className="rwd-table" style={{fontFamily: 'Major Mono Display',width: "70vw"}}>
                <tr>
                    <th>id</th>
                    <th>category</th>
                    <th>category description</th>
                    <th>open</th>
                </tr>
                {categories.map((data) => {
                    return(
                        <tr style={{background: "#38345e", color: "gold", fontWeight: "bold"}}>
                            <td  data-th="id">{data.Id}</td>
                            <td data-th="category">{data.Category.toLowerCase()}</td>
                            <td data-th="description">{data.Description.toLowerCase()}</td>
                            <td data-th={"action"}>
                                <IconButton aria-label="edit">
                                    <ArrowForwardIosIcon color={"white"} style={{color: "white"}} onClick={() =>{
                                        history.push(`/forum/category/${data.CategoryShort}`)
                                    } }/>
                                </IconButton></td>
                        </tr>
                    );
                })}

            </table>




        </section>
    );

};
export default ForumMainPage;