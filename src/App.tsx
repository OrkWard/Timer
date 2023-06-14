import { useState, useEffect } from 'react'

function Timer() {
  const [time, setTime] = useState(0);
  const [timeStart, setTimeStart] = useState(new Date().getTime());
  const [timeAccum, setTimeAccum] = useState(0);
  const [running, setRunning] = useState(false);


  function handlePause() {
    if (running) {
      setRunning(false);
      setTimeAccum(time);
      localStorage.time = time;
    }
    else {
      setTimeStart(new Date().getTime());
      setRunning(true);
    }
  }

  function handleStop() {
    setTimeAccum(0);
    setTime(0);
    localStorage.time = 0;
  }

  useEffect(() => {
    if (localStorage.time) {
      setTimeAccum(parseInt(localStorage.time));
      setTime(parseInt(localStorage.time));
    }
  }, []);

  useEffect(() => {
    const intervalID = setInterval(() => {
      if (running) {
        const newTime = timeAccum + new Date().getTime() - timeStart;
        setTime(newTime);
        localStorage.time = newTime;
      }
    }, 500)

    return () => {
      clearInterval(intervalID);
    }
  }, [running, time, timeStart, timeAccum]);

  return (
    <div className='flex space-x-2'>
      <span>
        {(time / 1000).toFixed(0)}
      </span>
      <button className='bg-blue-500 border-2 text-white' onClick={handlePause}>{running ? 'pause' : 'start'}</button>
      <button className='bg-blue-500 border-2 text-white' onClick={handleStop} disabled={running}>restart</button>
    </div>
  )
}

function App() {
  return (
    <>
      <div className='flex justify-items-center'>
        <Timer />
      </div>
      {/* <Timer startTime={10} /> */}
    </>
  )
}

export default App
