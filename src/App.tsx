import { useState, useEffect } from 'react'

function Timer({ id }: { id: number }) {
  const [time, setTime] = useState(0);
  const [timeStart, setTimeStart] = useState(new Date().getTime());
  const [timeAccum, setTimeAccum] = useState(0);
  const [running, setRunning] = useState(false);

  function setLocalStorge(timeSet: number) {
      const timeRecord = localStorage.time ? JSON.parse(localStorage.time) : [];
      timeRecord[id] = timeSet;
      localStorage.time = JSON.stringify(timeRecord);
  }

  function handlePause() {
    if (running) {
      setRunning(false);
      setTimeAccum(time);
      setLocalStorge(time);
    }
    else {
      setTimeStart(new Date().getTime());
      setRunning(true);
    }
  }

  function handleStop() {
    setTimeAccum(0);
    setTime(0);
    setLocalStorge(0);
  }

  useEffect(() => {
    if (localStorage.time) {
      const timeRecord = JSON.parse(localStorage.time);
      setTimeAccum(timeRecord[id]);
      setTime(timeRecord[id]);
    }
  }, []);

  useEffect(() => {
    const intervalID = setInterval(() => {
      if (running) {
        const newTime = timeAccum + new Date().getTime() - timeStart;
        setTime(newTime);
        setLocalStorge(newTime);
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
      <div className='flex justify-items-center flex-col'>
        <Timer id={0} />
        <Timer id={1} />
      </div>
      {/* <Timer startTime={10} /> */}
    </>
  )
}

export default App