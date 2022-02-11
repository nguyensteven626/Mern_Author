import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useHistory, useParams} from 'react-router-dom';


const DisplayAll = (props) => {

    const {id} = useParams();
    const {allAuthor, setAllAuthor} = props;
    const history = useHistory();

    
    useEffect( () => {//triggers when the components finishes
        axios.get("http://localhost:8000/api/authors")
          .then(response => {
            console.log(response.data.authors)
            setAllAuthor(response.data.authors)
          })
          .catch(error=>{ console.log(error); }) },[id]);

    


    const deleteAuthor = (deleteId) =>{
        axios.delete(`http://localhost:8000/api/authors/delete/${deleteId}`)
        .then(response => {

            console.log("Deleted");
            const resultArray = props.allAuthor.filter(p => p._id !== deleteId);
            console.log(resultArray);
            props.setAllAuthor(resultArray);
        })
        .catch(error => console.log(error))
    }



    return (
        <div>
            <h1>Authors</h1>
            <br/>
            <Link to={`/authors/new`}>Add Author</Link>
            {/* {
                JSON.stringify(allAuthor)
            } */}

            <div>
            
            {
                props.allAuthor.map((a,idx) => {
                    return(
                        <div key={idx}>
                            <h3>Author: {a.title}</h3>
                            <div>
                                <button><Link to={`/authors/update/${a._id}`}>Edit</Link></button>
                                <button onClick={() => deleteAuthor(a._id)}>Delete</button>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
};

export default DisplayAll;