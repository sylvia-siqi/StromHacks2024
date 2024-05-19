import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Goal = ({ goal, onToggle }) => {
    const handleCheckboxChange = () => {
      onToggle(goal.id, !goal.completed);
    };
  
    return (
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', fontSize:'1.5rem' }}>
        <input
          type="checkbox" class="largerCheckbox"
          checked={goal.completed}
          onChange={handleCheckboxChange}
          style={{ marginRight: '1rem' }}
        />
        <span>{goal.name}</span>
      </div>
    );
  };
  
  export default Goal;