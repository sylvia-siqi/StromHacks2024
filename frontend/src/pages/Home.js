import React, { useState, useEffect } from "react";
import "../App.css";
import "../index.css";
import "../home.css";
import catImg from '../img/black_cat.png';
import ProgressBar from './ProgressBar';
import GoalList from './GoalList';

const Home = () => {

    //data needs update!!!
    const [progress, setProgress] = useState(50);

    const [userID, setUserID] = useState("");
    //const [user, setUser] = useState([]);

    async function getUser() {
        const response = await fetch(`/user/${localStorage.getItem('user_id')}`, {
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
                .then(data => {console.log(data)})
        } else {
            console.log(response);
        }
    }

    useEffect(() => {
        setUserID(localStorage.getItem('user_id'));
        getUser();
    }, [])

    return (
    <div>
        <h1 className="body home accent-font margin-s ">FitCat</h1>
        {/*display the cat*/}
        <div className="body"> 
            <h2>Welcome, {userID}</h2>
            <ProgressBar progress={progress} />
            <p>Complete goals to energize your cat !</p>
            {/* <button onClick={() => setProgress(progress + 10)} style={{ margin: '10px' }}>
                Increase
            </button>
            <button onClick={() => setProgress(progress - 10)} style={{ margin: '10px' }}>
                Decrease
            </button> */}
            <img style={{margin:"2rem", width:"80%"}} src={catImg} alt=""></img>

        </div>

        <GoalList />
    </div>
    );
  };
  
  export default Home;
  