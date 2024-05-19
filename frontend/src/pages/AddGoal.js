import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const AddGoal = () => {

    async function getGoals() {

        const response = await fetch("/goals", {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                user_id: localStorage.getItem('user_id')
            })
        })
        
        if (response.ok){
            alert("get goals worked!")
        }
    }

    /* fetch('http://localhost:5000/goals')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error)) */

/*     useEffect(() => {
        // Using fetch to fetch the api from 
        // flask server it will be redirected to proxy
        fetch("http://localhost:5000/goals").then((res) =>
            res.json().then((data) => {
                console.log(data);

            })
        );

    }, []); */

/*     useEffect(() => {
        // Using fetch to fetch the api from 
        // flask server it will be redirected to proxy
        fetch("/user").then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                console.log(data);
            })
        );

    }, []); */

    return (
    <div>
        <h1>Add Goal!</h1>
        <Link to="/">Login</Link>

        <button onClick={getGoals}>Goals</button>
    </div>
    );
  };
  
  export default AddGoal;
  