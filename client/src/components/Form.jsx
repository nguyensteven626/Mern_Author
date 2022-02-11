import React, {useState} from 'react';
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";


const Form = (props) => {

    const {allAuthor, setAllAuthor} = props;
    
    
    const [title, setTitle] = useState("");
    const history = useHistory()

    //Errors
    const [errors, setErrors] = useState([]);


    const createAuthor = (e) =>{
        e.preventDefault();
        const newAuthor = {title};
        console.log("created", newAuthor);
        
        axios.post("http://localhost:8000/api/authors/new", newAuthor)
        .then(res=> {
            console.log(res.data);
            let allAuthorCopy = [...props.allAuthor];
            allAuthorCopy.push(newAuthor);

            console.log(allAuthorCopy);
            props.setAllAuthor(allAuthorCopy)
            setTitle("")
            history.push("/")
        })
        .catch(err => {
            console.log("ERORRRRR")
            console.log(err.response.data)

            const {errors} = err.response.data.error;
            const messages = Object.keys(errors).map(error => errors[error].message)
            console.log(messages);
            setErrors(messages);
        })
    }
        
    return( 
        <div>

            <div>
                <p>Add new author:</p>
                <button><Link to="/">Home</Link></button>
            </div>
            <form onSubmit = { createAuthor }>
                {errors.map((e, index) => <p key={index}>{e}</p>)}
                <div>
                    <label>Name: </label>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} value={title}></input>
                </div>
                <input type = "submit" value="Submit Author"/>
                <button><Link to="/">Cancel</Link></button>
            </form>
        </div>
    )
};

export default Form;