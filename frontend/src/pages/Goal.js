import React from "react";

const Goal = ({ goal, updateProgress }) => {
    const handleCheckboxChange = () => {
      //onToggle(goal.id, !goal.completed);
    };

    async function submitGoal() {

      const response = await fetch("/complete_goal", {
          method: "PUT",
          headers: {
              'Content-Type' : 'application/json'
          },
          body: JSON.stringify({
              goal_id: goal[0],
              complete: 1
          })
      })
      if (response.ok){
          handleCheckboxChange();
          updateProgress();
      } else { 

      }
  }
  
    return (
      <div key={goal[0]} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', fontSize:'1.5rem' }}>
        <input
          type="checkbox" className="largerCheckbox"
          checked={goal.completed}
          onChange={submitGoal}
          style={{ marginRight: '1rem' }}
        />
        <span>{goal[4]}: {goal[3]}</span>
      </div>
    );
  };
  
  export default Goal;