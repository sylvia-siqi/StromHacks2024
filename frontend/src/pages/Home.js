import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Home = () => {

    const [userID, setUserID] = useState("");
    const [user, setUser] = useState("");
    const [goals, setGoals] = useState([]);

    async function getUser() {
        console.log(`/user/${userID}`);
        const response = await fetch(`/user/${userID}`, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                user_id: localStorage.getItem('user_id')
            })
        })
        if (response.ok){
            await response.json()
                .then(data => console.log(data))
                
        }
    }

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
            await response.json()
                .then(data => setGoals(data))
        }
    }

    useEffect(() => {
        setUserID(localStorage.getItem('user_id'));
        //getUser();
        getGoals();
    }, [])

    return (
    <div>
        <h1>Home</h1>
        <Link to="/">Login</Link>
        <Link to="/addgoal">Add Goal</Link>

        {userID && <h2>Welcome, {userID}</h2>}
        {!userID && <h2>Please sign in to track your pet.</h2>}

        <ul>
            {
                goals.map((goal) => (
                    <li key={goal[0]}>CAT:{goal[4]} - ID:{goal[0]} - TIME:{goal[2]} - DESC:{goal[3]}</li>
                ))
            }
        </ul>
    </div>
    );
  };
  
  export default Home;
  