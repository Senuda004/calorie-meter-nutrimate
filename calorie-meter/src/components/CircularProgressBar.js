import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti'; // Import Confetti component

const CircularProgressBar = ({ goal, consumed, onConsumedChange }) => {
  console.log('Received consumed value:', consumed); // Debugging line
  console.log('Received onConsumedChange function:', onConsumedChange); // Debugging line
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false); // New state to control confetti visibility
  const [caloriesToAddOrDeduct, setCaloriesToAddOrDeduct] = useState(0); // State to hold user input
  const [size, setSize] = useState(380); // Size of the circle
  const [strokeWidth, setStrokeWidth] = useState(30); // Width of the progress bar
  const [radius, setRadius] = useState(size / 2 - strokeWidth / 2); // Radius of the circle
  const normalizedProgress = consumed > goal ? goal : consumed; // Adjust progress based on the goal
  const circumference = 2 * Math.PI * radius;
  const progressOffset = ((goal - normalizedProgress) / goal) * circumference;
  const progressPercentage = (consumed / goal) * 100;  // Calculate the percentage of progress
  
 /* const handleInputChange = (event) => {
    setCaloriesToAddOrDeduct(parseInt(event.target.value)); // Convert input to integer
  };*/
  const handleInputChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
       setCaloriesToAddOrDeduct(value);
    }
   };
   useEffect(() => {
    if (showCongratulations) {
      setShowConfetti(true); // Show confetti when congratulations are shown
      const timer = setTimeout(() => {
        setShowConfetti(false); // Hide confetti after 5 seconds
        setShowCongratulations(false); // Hide congratulations message
      }, 20000);
      return () => clearTimeout(timer); // Cleanup on component unmount
    }
 }, [showCongratulations]);

  /*
  const handleAddCalories = (caloriesToAdd) => {
    const newConsumed = consumed + caloriesToAdd;
    if (newConsumed > goal) {
      alert('Adding these calories will exceed your daily goal!');
      
    } else {
      onConsumedChange(newConsumed);
     
    }
  };*/
  
  const handleAddCalories = () => {
    // Check if goal is set
    if (!consumed) {
      alert('Please set a goal first.');
      return;
    }
  
    // Proceed with adding calories if goal is set
    const newConsumed = consumed + caloriesToAddOrDeduct;
    if (newConsumed > goal) {
      alert('Adding these calories will exceed your daily goal!Change the goal if you want');
    } else {
      onConsumedChange(newConsumed);
      if (newConsumed === 0) {
        setShowCongratulations(true); // Show congratulations when newConsumed is 0
      }
    }
  };
  
  const handleDeductCalories = () => {
    const newConsumed = consumed - caloriesToAddOrDeduct;
    if (newConsumed < 0) {
      alert('You cannot deduct more calories than you have consumed!');
    } else {
      onConsumedChange(newConsumed);
      if (newConsumed === 0) {
        setShowCongratulations(true); // Show congratulations when newConsumed is 0
      }
    }
  };

  // Determine stroke color based on progress percentage
  let strokeColor;
  if (progressPercentage < 33) {
    strokeColor = '#d9534f';
  } else if (progressPercentage < 66) {
    strokeColor = '#5bc0de';
  } else {
    strokeColor = '#5cb85c';
  }

  return (
    <div>
        {/* SVG container */}
      <svg width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2} // Center x-coordinate
          cy={size / 2} // Center y-coordinate
          r={radius} // Radius of the circle
          fill="none" // No fill color
          stroke="#D9D9D9" // Gray stroke color
          strokeWidth={strokeWidth} // Width of the stroke
        />
        {/* Progress circle */}
        <circle
          cx={size / 2} // Center x-coordinate
          cy={size / 2} // Center y-coordinate
          r={radius} // Radius of the circle
          fill="none" // No fill color
          stroke={strokeColor} // Dynamic stroke color
          strokeWidth={strokeWidth} // Width of the stroke
          strokeDasharray={circumference} // Circumference of the circle
          strokeDashoffset={progressOffset} // Offset for the stroke dash
          strokeLinecap="round" // Rounded ends for the stroke
          transform={`rotate(-90 ${size / 2} ${size / 2})`} // Rotate the circle by -90 degrees
        />
        {/* Text inside the circle */}
        <text x="50%" y="50%" textAnchor="middle" fontSize="25" fill='black'>
          {/* Goal text */}
          <tspan x="50%" dy="-0.8em" fontWeight="bold">{goal} kcal</tspan>
          {/* Description text */}
          <tspan x="50%" dy="1.5em">Daily goal</tspan>
        </text>
      </svg>
      
      {showCongratulations && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1000 }}>
          <Confetti />
          <div style={{ position: 'absolute',width:'80%', top: '65%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', fontSize: '2em', color: 'white' ,backgroundColor:'#FFC533',borderRadius:'50px'}}>
          Congratulations on reaching your daily goal! It's time to set another goal and keep up.
          </div>
        </div>
      )}
      <div className='addDuctBtns' style={{ textAlign: 'center' }}>
        <p>Input your calories</p>
        <input type="number" value={caloriesToAddOrDeduct} onChange={handleInputChange} placeholder='Enter your calories' id='calInput' />
        <button className='cbtn1' onClick={handleDeductCalories}>Deduct Calories</button>
        <div id='count'>{consumed}/{goal} kcal</div>
        <button className='cbtn2' onClick={handleAddCalories}>Add Calories</button>
      </div>
    </div>
  );
};


export default CircularProgressBar;
