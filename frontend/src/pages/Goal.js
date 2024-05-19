import React from "react";

const Goal = ({ goal, onToggle }) => {
    const handleCheckboxChange = () => {
      onToggle(goal.id, !goal.completed);
    };
  
    return (
      <div key={goal.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', fontSize:'1.5rem' }}>
        <input
          type="checkbox" className="largerCheckbox"
          checked={goal.completed}
          onChange={handleCheckboxChange}
          style={{ marginRight: '1rem' }}
        />
        <span>{goal.name}</span>
      </div>
    );
  };
  
  export default Goal;