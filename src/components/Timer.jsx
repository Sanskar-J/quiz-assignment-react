import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Timer = () => {
  const [timeRemaining, setTimeRemaining] = useState(30*60); // 30 minutes in seconds
  const navigate=useNavigate()

  const onClick = () =>{
    navigate("/report");
  }
  // Decrease the time remaining every second
  useEffect(() => {
    const timer = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1);
      } else {
        // When the timer expires, trigger the onClick event
        clearInterval(timer);
        onClick();
      }
    }, 1000); // 1000 milliseconds = 1 second

    return () => {
      clearInterval(timer); // Clean up the timer when the component unmounts
    };
  }, [timeRemaining, onClick]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  return (
    <div className="d-flex align-items-center justify-content-center bg-light text-black border-bottom rounded-circle">
      <h2 className="p-3">
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </h2>
    </div>
  );
};

export default Timer;
