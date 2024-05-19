import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProgressBar = ({ progress }) => {
    const containerStyle = {
      height: '1rem',
      width: '100%',
      backgroundColor: '#e0e0de',
      borderRadius: '.5rem',
      overflow: 'hidden',
    };

    const getColor = (progress) => {
        if (progress < 20) {
          return '#ff4d4d'; // Red for progress < 20%
        } else if (progress > 60) {
          return '#76c7c0'; // Green for progress > 60%
        } else {
          return '#ffa500'; // Orange for 20% <= progress <= 60%
        }
      };
  
    const fillerStyle = {
      height: '100%',
      width: `${progress}%`,
      backgroundColor: getColor(progress),
      transition: 'width 0.2s ease-in',
      borderRadius: 'inherit',
      textAlign: 'right',
    };
  
    const labelStyle = {
      padding: '5px',
      color: 'white',
      fontWeight: 'bold',
    };
  
    return (
      <div style={containerStyle}>
        <div style={fillerStyle}>
          {/* <span style={labelStyle}>{`${progress}%`}</span> */}
        </div>
      </div>
    );
  };
  
  export default ProgressBar;