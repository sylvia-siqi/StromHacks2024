import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Goal from "./Goal";

const GoalList = () => {
    //const [goals, setGoals] = useState([]);
  
    // useEffect(() => {
    //   // Fetch goals from the backend when the component mounts
    //   fetch('/api/goals')
    //     .then(response => response.json())
    //     .then(data => setGoals(data))
    //     .catch(error => console.error('Error fetching goals:', error));
    // }, []);

    // Hardcoded goals for testing purposes
    const [goals, setGoals] = useState([
        { id: 1, name: 'Learn React', completed: false },
        { id: 2, name: 'Build a project', completed: true },
        { id: 3, name: 'Write tests', completed: false }
    ]);
  
    const handleToggleGoal = (id, completed) => {
      // Update goal status in the backend
      fetch(`/api/goals/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed }),
      })
        .then(response => response.json())
        .then(updatedGoal => {
          // Update goal status in the state
          setGoals(goals.map(goal => (goal.id === id ? updatedGoal : goal)));
        })
        .catch(error => console.error('Error updating goal:', error));
    };
  
    return (
      <div style={{ padding: '1.5rem', border: '1px solid #ccc', borderRadius: '1.5rem', background:"#fff" }}>
        <h2>Today's Goals</h2>
        {goals.map(goal => (
          <Goal key={goal.id} goal={goal} onToggle={handleToggleGoal} />
        ))}
        <Link class="padding-m button-link" to="/addgoal">Add Goal</Link>
      </div>
    );
  };
  
  export default GoalList;