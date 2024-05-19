import React, { useState, useEffect } from "react";
import "../App.css";
import "../index.css";
import "../home.css";
import ProgressBar from './ProgressBar';
import GoalList from './GoalList';

import catImgBase from '../img/black_cat.png';
import decorImgVerySleepy from '../img/cat_eyes_very_sleepy.png';
import decorImgSleepy from '../img/cat_eyes_sleepy.png';
import decorImgActive from '../img/active_confetti.png';
import decorEnergized from '../img/active_energized.png';
import decorBlank from '../img/blank_decor.png';

/* async function getActiveTimeData(userID) {
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
} */

const Home = () => {

    const [userID, setUserID] = useState("");
    const [user, setUser] = useState([]);

    const [sleepData, setSleepData] = useState(null);
    const [activeTimeData, setActiveTimeData] = useState(null);
    const [progress, setProgress] = useState(0);

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
                .then(data => setUser(data))
                
        }
    }

    async function getSleepData() {
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
            await response.json()
                .then(data => setSleepData(data))
        }
    }

    function increaseProgress() {
        setProgress(progress + 20);
    }

    function getSleepDecor() {
        if (progress < 30) {
          return decorImgVerySleepy;
        } else if (progress < 60) {
          return decorImgSleepy;
        } else {
          return decorBlank;
        }
      };

    const getActiveDecor = (activeStat) => {
    if (progress < 30) {
        return decorBlank;
    } else if (progress < 60) {
        return decorImgActive;
    } else {
        return decorEnergized;
    }
    };

    useEffect(() => {
        const userID = localStorage.getItem('user_id');
        setUserID(userID);
        getUser();
    }, []);

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

            <div className="catImgGroup">
                <img  src={getActiveDecor(activeTimeData)} alt=""></img>
                <img  src={catImgBase} alt=""></img>
                <img  src={getSleepDecor(sleepData)} alt=""></img>
            </div>
        </div>

        <GoalList updateProgress={increaseProgress} />
    </div>
    );
  };
  
  export default Home;
  