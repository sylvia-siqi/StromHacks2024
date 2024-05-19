import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Home = () => {

    const [user, setUser] = useState({
        id: "",
        username: ""
    });
 
    // Using useEffect for single rendering
    useEffect(() => {
        // Using fetch to fetch the api from 
        // flask server it will be redirected to proxy
        fetch("/user").then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                setUser({
                    id: data.id,
                    username: data.username
                });
            })
        );

    }, []);

    return (
    <div>
        <h1>Home</h1>
        <Link to="/">Login</Link>
        <Link to="/addgoal">Add Goal</Link>

        <h2>Welcome, {user.username}</h2>
        <p>ID: {user.id}</p>
    </div>
    );
  };
  
  export default Home;
  