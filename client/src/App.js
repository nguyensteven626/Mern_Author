import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from './components/Form';
import DisplayAll from './components/DisplayAll';
import OneAuthor from './components/OneAuthor';
import EditAuthor from './components/EditAuthor';
import { Switch, Route, Link } from 'react-router-dom';

function App() {

  const [allAuthor, setAllAuthor] = useState([])

  useEffect( () => {//triggers when the components finishes
    axios.get("http://localhost:8000/api/authors")
      .then(response => {
        console.log(response.data.authors)
        setAllAuthor(response.data.authors)
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <div className="App">
      {/* {
        JSON.stringify(allAuthor)
      } */}
      <Switch>


      <Route path= "/authors/update/:id">
        <EditAuthor/>
      </Route>

      {/* <Route path = "/authors/:id">
        <OneAuthor/>
      </Route> */}

      <Route path = "/authors/new">
        <Form allAuthor = {allAuthor} setAllAuthor = {setAllAuthor}/>
      </Route>

      <Route path = "/">
        <DisplayAll allAuthor = {allAuthor} setAllAuthor = {setAllAuthor}/>
      </Route>

      </Switch>
    </div>
  );
}

export default App;
