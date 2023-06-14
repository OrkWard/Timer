import { useState, useEffect } from 'react'
import './App.css'

function Timer({ restarted, running }: { restarted: boolean, running: boolean }) {
  const [time, setTime] = useState(0);
  const [timeLast, setTimeLast] = useState(new Date().getTime());

  useEffect(() => {
    const timeNow = new Date().getTime();
    const intervalID = setInterval(() => {
      if (restarted) {
        setTime(0);
      }
      else if (running) {
        setTime(timeNow - timeLast + time);
      }
      setTimeLast(timeNow);
    }, 500)

    return () => {
      clearInterval(intervalID);
    }
  }, [running, time, timeLast, restarted]);

  return (
    <span className='timer'>
      {restarted ? 0 :(time / 1000).toFixed(0)}
    </span>
  )
}

function App() {
  const [firstRestart, setFirstRestart] = useState(false);
  const [firstRun, setFirstRun] = useState(false);

  function handlePause() {
    if (firstRestart) {
      setFirstRestart(false);
    }
    setFirstRun(!firstRun);
  }

  function handleStop() {
    setFirstRestart(true);
  }

  return (
    <>
      <div className='container'>
        <div className='logo timer-container' >
          <Timer restarted={firstRestart} running={firstRun} />
          <button className='start' onClick={handlePause} >
            {firstRun ? 'pause' : 'run'}
          </button>
          <button className='restart' onClick={handleStop} disabled={firstRun}>
            restart
          </button>
        </div>
      </div>
      {/* <Timer startTime={10} /> */}
    </>
  )
}

export default App
