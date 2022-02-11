import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams, useHistory, Link} from 'react-router-dom';

const OneAuthor = (props) => {

    const {id} = useParams();
    const [oneAuthor, setOneAuthor] = useState("");
    const history = useHistory();

    useEffect( () => {
        axios.get(`http://localhost:8000/api/authors/${id}`)
        .then(response=>{
            console.log(response)
            setOneAuthor(response.data.author);
        })
        .catch(error => console.log(error))
      }, [id])


    const deleteAuthor = (deleteId) =>{
        axios.delete(`http://localhost:8000/api/authors/delete/${deleteId}`)
        .then(response => {
            console.log("Deleted");
            history.push("/") //after deleting return home
        })
        .catch(error => console.log(error))
    }


    return (
        <div>
            <h1>{oneAuthor.title}</h1>
            {
                JSON.stringify(oneAuthor)
            }
            <button onClick={() => deleteAuthor(oneAuthor._id)}>Delete</button>
            <button><Link to="/">Home</Link></button>
            <button><Link to={`/authors/update/${id}`}>Edit</Link></button>
        </div>
        );
};

export default OneAuthor;