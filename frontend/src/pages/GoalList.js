import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Goal from "./Goal";

const GoalList = ({updateProgress}) => {
    const [goals, setGoals] = useState([]);

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
      getGoals();
    }, [])
  
    return (
      <div style={{ padding: '1.5rem', border: '1px solid #ccc', borderRadius: '1.5rem', background:"#fff" }}>
        <h2>Today's Goals</h2>
        {goals.map(goal => (
          <Goal key={goal[0]} goal={goal} updateProgress={updateProgress} />
        ))}
        <Link className="padding-m button-link" to="/addgoal">Add Goal</Link>
      </div>
    );
  };
  
  export default GoalList;