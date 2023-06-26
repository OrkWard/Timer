import { useState, useEffect } from 'react'

function Timer({ name, id }: { name: string, id: number }) {
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
  }, [id]);

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
    <div className='flex space-x-1 border-2 border-blue-500 p-3 my-2 rounded-md items-center'>
      <span className='w-20 text-center border-2 border-blue-500 rounded-md' >{name}</span>
      <span className='w-20 text-center'>
        {Math.trunc(time / 60000).toString().padStart(2, '0') + ':' + (Math.trunc(time / 1000) % 60).toString().padStart(2, '0')}
      </span>
      <span className='flex flex-col'>
        <button className='bg-blue-500 border-2 text-white w-20 rounded-md' onClick={handlePause}>{running ? 'pause' : 'start'}</button>
        <button className='bg-blue-500 border-2 text-white w-20 rounded-md disabled:text-gray-400' onClick={handleStop} disabled={running}>restart</button>
      </span>
    </div>
  )
}

function App() {
  return (
    <>
      <div className='flex justify-items-center flex-col bg-slate-100 p-5 rounded-md'>
        <Timer id={0} name='work' />
        <Timer id={1} name='learn' />
        <Timer id={2} name='relax' />
      </div>
      {/* <Timer startTime={10} /> */}
    </>
  )
}

export default App
