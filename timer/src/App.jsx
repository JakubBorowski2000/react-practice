import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const interval = useRef(null);

  useEffect(() => {
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = null;
      }
    };
  }, []);

  function handleTimer(){
    if(!interval.current){
      startTimer();
    }else{
      pauseTimer();
    }
  }
  function startTimer(){
      interval.current = window.setInterval(updateTimer, 1000);
      setIsRunning(true);
  }
  function pauseTimer(){
      clearInterval(interval.current);
      interval.current = null;
      setIsRunning(false);
  }

  function resetTimer(){
    setTimer(0);
    if(interval.current){
      pauseTimer();
    }
  }

  function updateTimer(){
    setTimer(previousTimer => previousTimer === 359999 ? 0 : previousTimer + 1);
  }

  function formatTime(seconds){
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) /60);
    const secs = seconds % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(secs).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <>
      <div className="timerContainer">
        <p className="timer">{formatTime(timer)}</p>
        <div className="buttonContainer">
          <button onClick={handleTimer}>{isRunning ? "Pause" : "Start"}</button>
          <button onClick={resetTimer}>Reset</button>
        </div>
      </div>
    </>
  )
}

export default App
