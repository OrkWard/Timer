import { useState, useEffect } from 'react'
import './App.css'

function Timer() {
  const [time, setTime] = useState(0);
  const [timeStart, setTimeStart] = useState(new Date().getTime());
  const [timeAccum, setTimeAccum] = useState(0);
  const [running, setRunning] = useState(false);


  function handlePause() {
    if (running) {
      setRunning(false);
      setTimeAccum(time);
    }
    else {
      setTimeStart(new Date().getTime());
      setRunning(true);
    }
  }

  function handleStop() {
    setTimeAccum(0);
    setTime(0);
  }

  useEffect(() => {
    const intervalID = setInterval(() => {
      if (running) {
        setTime(timeAccum + new Date().getTime() - timeStart);
      }
    }, 500)

    return () => {
      clearInterval(intervalID);
    }
  }, [running, time, timeStart, timeAccum]);

  return (
    <div>
      <span className='timer'>
        {(time / 1000).toFixed(0)}
      </span>
      <button onClick={handlePause}>{running ? 'pause' : 'start'}</button>
      <button onClick={handleStop} disabled={running}>restart</button>
    </div>
  )
}

function App() {
  return (
    <>
      <div className='container'>
        <div className='logo timer-container' >
          <Timer />
        </div>
      </div>
      {/* <Timer startTime={10} /> */}
    </>
  )
}

export default App
