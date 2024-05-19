import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../App.css";
import "../index.css";
import "../home.css";
import catImg from '../img/black_cat.png';
import ProgressBar from './ProgressBar';
import GoalList from './GoalList';

import catImgBase from '../img/black_cat.png';
import decorImgVerySleepy from '../img/cat_eyes_very_sleepy.png';
import decorImgSleepy from '../img/cat_eyes_sleepy.png';
import decorImgActive from '../img/active_confetti.png';
import decorEnergized from '../img/active_energized.png';
import decorBlank from '../img/blank_decor.png';

async function getSleepData(userID) {
    const response = await fetch("/sleep", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: localStorage.getItem('user_id')
        })
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    }
}

async function getActiveTimeData(userID) {
    const response = await fetch("/active-time", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: localStorage.getItem('user_id')
        })
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    }
}
async function getProgressData(userID) {
    const response = await fetch("/mood", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: localStorage.getItem('user_id')
        })
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    }
}

const getSleepDecor = (sleepStat) => {
    if (sleepStat < 30) {
      return decorImgVerySleepy;
    } else if (sleepStat < 60) {
      return decorImgSleepy;
    } else {
      return decorBlank;
    }
  };

  const getActiveDecor = (activeStat) => {
    if (activeStat < 30) {
      return decorBlank;
    } else if (activeStat< 60) {
      return decorImgActive;
    } else {
      return decorEnergized;
    }
  };

const Home = () => {

    const [userID, setUserID] = useState("");
    const [user, setUser] = useState("");
    const [goals, setGoals] = useState([]);

    const [sleepData, setSleepData] = useState(null);
    const [activeTimeData, setActiveTimeData] = useState(null);
    const [progress, setProgressData] = useState(0);

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
        const userID = localStorage.getItem('user_id');
        setUserID(userID);
        
        async function fetchData() {
            const userData = await getUser(userID);
            const goalsData = await getGoals(userID);
            const sleepData = await getSleepData(userID);
            const activeTimeData = await getActiveTimeData(userID);
            
            setUser(userData);
            setGoals(goalsData);
            setSleepData(sleepData);
            setActiveTimeData(activeTimeData);
        }

        if (userID) {
            fetchData();
        }
    }, []);

    return (
    <div>
        <h1 class="body home accent-font margin-s ">FitCat</h1>
        {/*display the cat*/}
        <div class="body"> 
            <h2>Welcome, {userID}</h2>
            <ProgressBar progress={progress} />
            <p>Complete goals to energize your cat !</p>
            {/* <button onClick={() => setProgress(progress + 10)} style={{ margin: '10px' }}>
                Increase
            </button>
            <button onClick={() => setProgress(progress - 10)} style={{ margin: '10px' }}>
                Decrease
            </button> */}

            <div className="catImgGroup">
                <img  src={getActiveDecor(activeTimeData)} alt=""></img>
                <img  src={catImgBase} alt=""></img>
                <img  src={getSleepDecor(sleepData)} alt=""></img>
            </div>
        </div>

        <GoalList />

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
  