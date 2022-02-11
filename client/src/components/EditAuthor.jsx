import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams, useHistory, Link} from 'react-router-dom';

const EditAuthor = (props) => {
    
    const {id} = useParams();
    const [title, setTitle] = useState("")
    const history = useHistory();
    const [errors, setErrors] = useState([]);

    useEffect(() =>{
        axios.get(`http://localhost:8000/api/authors/${id}`)
        .then(response=> {
            console.log(response.data.author);
            setTitle(response.data.author.title)
        })
        .catch(error=>{
            console.log(error);
        })
    },[])

    const updateOneAuthor = (e) => {
        e.preventDefault();
        const updateOneAuthor = {
            title: title,
        }
        axios.put(`http://localhost:8000/api/authors/update/${id}`, updateOneAuthor)
        .then(response => {
            console.log(response.data);
            history.push(`/authors/${id}`)
        })
        // .catch(error =>{
        //     console.log(error)
        // })
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
                <p>Edit this author</p>
            </div>
            <form onSubmit = { updateOneAuthor }>
                {errors.map((e, index) => <p key={index}>{e}</p>)}
                <div>
                    <label>Title: </label>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} value={title}></input>
                </div>
                <input type = "submit" value="Submit"/>
                <button><Link to="/">Home</Link></button>
            </form>
        </div>
    )
};

export default EditAuthor;