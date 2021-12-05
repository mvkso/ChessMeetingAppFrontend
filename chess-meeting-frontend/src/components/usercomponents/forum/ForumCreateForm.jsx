import React,  {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";

import "../../css/SignIn.css"
import Title from "../../../Title";
import {TextareaAutosize, TextField} from "@material-ui/core";
import {Alert, Autocomplete} from "@material-ui/lab";
import {isNullOrUndefined} from "@syncfusion/ej2-base";

import categories from "../../../scripts/categories";
import authentication from "../../../scripts/authentication";


const ForumCreateForm = () => {

    const history = useHistory();


    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [mappedCategories, setMappedCategories] = useState([]);
    const [successful, setSuccessful] = useState(null);
    const [message, setMessage] = useState("");

    useEffect( () => {
        (categories.map((data) => {
            mappedCategories.push(data.CategoryShort)

        }));
    })



    const onChangeTitle = (e) => {
        const temp = e.target.value;
        setTitle(temp);
    };

    const onChangeContent = (e) => {
        const temp = e.target.value;
        setContent(temp);
    };

    const onChangeCategory = (e) => {
        const temp = e.target.value;
        setCategory(temp);
    };

    const handleCreateReservation = (e) => {
        if(title != null && content != null && category != null){
            authentication.createTopic(title, content, category, authentication.getCurrentUser().id)
                .then((response) =>
                    {
                        setSuccessful(true);
                        setMessage("Topic creation succeed!");

                    },
                    (error)=>{
                        setSuccessful(false)
                        setMessage("Error")

                    }
                )
        }else {
            setSuccessful(false)
            setMessage("Cant create a topic")
        }

    }


    return(
        <section className="signup-section" style={{height: "100vh", width: "100vw"}}>
            <Title style={{fontFamily: 'Major Mono Display',color: "darkblue", fontWeight: "bold", marginTop: "20px"}}>create a topic</Title>
            <div class="login-page" style={{display: "flex", flexDirection: "column", width: "80vw"}}>
                <div class="form-login" style={{marginTop: "-100px", maxWidth: "80vw"}}>
                    <form class="register-form"  onSubmit={handleCreateReservation}  style={{width: "40vw"}}>
                        {successful === true && message !== "" && <Alert severity="success">{message}</Alert>}
                        {successful === false && message !== "" && <Alert severity="error">{message}</Alert>}
                        <div id="textFields" style={{display:"flex", flexDirection: "column", width: "40vw"}}>
                            <Autocomplete
                                id="combo-box-demo"

                                options={mappedCategories}
                                style={{ width: "100%" }}
                                renderInput={(params) => <TextField {...params} label="topic category" variant="outlined"
                                                                    required={isNullOrUndefined(category)} error={isNullOrUndefined(category)}/>}
                                onChange={(e, newValue) => {
                                    setCategory(newValue);
                                }}
                                value={category}
                            />
                            <TextField
                                fullWidth
                                id="standard-text"
                                label="Title"
                                type="text"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant={"filled"}
                                onChange={onChangeTitle}
                                value={title}
                                style={{ width: "auto" }}
                                required
                            />
                            <TextareaAutosize
                                fullWidth
                                id="standard-text"
                                label="Content"
                                placeholder={"Type a content"}
                                type="text"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant={"filled"}
                                onChange={onChangeContent}
                                value={content}
                                minRows={5}
                                required


                            />


                        </div>
                        <br/>
                        <button id="submitButton" type='submit' style={{backgroundColor: "#5b5cff"}}>create a topic</button>
                    </form>
                </div>
            </div>

        </section>
    );


};
export default ForumCreateForm;
