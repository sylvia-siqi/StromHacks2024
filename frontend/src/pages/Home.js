import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../App.css";
import "../index.css";
import "../home.css";
import catImg from '../img/black_cat.png';
import ProgressBar from './ProgressBar';
import GoalList from './GoalList';

const Home = () => {

    const [user, setUser] = useState({
        id: "",
        username: ""
    });

    //data needs update!!!
    const [progress, setProgress] = useState(50);
 
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
        <h1 class="body home accent-font margin-s ">FitCat</h1>
        {/*display the cat*/}
        <div class="body"> 
            <h2>Welcome, {user.username}</h2>
            <p>ID: {user.id}</p>
            <ProgressBar progress={progress} />
            <p>Complete goals to energize your cat !</p>
            {/* <button onClick={() => setProgress(progress + 10)} style={{ margin: '10px' }}>
                Increase
            </button>
            <button onClick={() => setProgress(progress - 10)} style={{ margin: '10px' }}>
                Decrease
            </button> */}
            <img style={{margin:"2rem", width:"80%"}} src={catImg}></img>

        </div>

        <GoalList />

        
        
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
  