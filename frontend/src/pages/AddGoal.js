import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
//import styles from "../index.css"


const AddGoal = () => {

    const [category, setCategory] = useState("");
    const [goalText, setGoalText] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        if (category === "" || goalText === ""){   // if no category was selected or no goal desc was entered
            // show error maybe. idk
            return;
        }

        const response = await fetch("/create_goal", {
            method: "PUT",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({category: category, goal_text: goalText, user_id: localStorage.getItem('user_id')})
        })
        debugger;
        if (response.ok){
            window.location.href = '/home';
        
        } else {
            alert("Create goal failed! :(")
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
        <h1 className="text-3xl">Add Goal!</h1>
        <Link to="/">Login</Link>

        <form className="flex flex-col items-center w-[80vw]">
            <label htmlFor="input-category">Category:</label>
            <select name="input-category" id="input-category" onChange={e => setCategory(e.target.value)}>
                <option value=''></option>
                <option value="Sleep">Sleep</option>
                <option value="Active Time">Active Time</option>
                <option value="Steps">Steps</option>
            </select>

            <label htmlFor="input-goal">Description:</label>
                <input type="text" id="input-goal" value={goalText}
                    onChange={e => setGoalText(e.target.value)} />

            <button type="submit" onClick={handleSubmit}>Create</button>
        </form>
    </div>
    );
  };
  
  export default AddGoal;
  