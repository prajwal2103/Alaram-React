import React, { useEffect, useState } from "react";
// import { v4 as uuidv4 } from 'uuid';
// let taskss=[]
const Inputs = () => {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [second, setSecond] = useState("");
  const [start, setStart] = useState(false);
  const [countDown, setCountDown] = useState("");
  // const[task,setTask]=useState(taskss)

  function timeFormat(hours, min, sec) {
    const timeString = `${hours.toString().padStart(2, "0")}:${min
      .toString()
      .padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
    setCountDown(timeString);
  }

  function setAlaram(hours, minutes, second) {
    let totalTimeInSec = hours * 3600 + minutes * 60 + second;
    const intervalId = setInterval(() => {
      if (totalTimeInSec > 0) {
        totalTimeInSec--;
        const hh = Math.floor(totalTimeInSec / 3600);
        const mm = Math.floor((totalTimeInSec % 3600) / 60);
        const ss = Math.floor(totalTimeInSec % 60);
        timeFormat(hh, mm, ss);
      } else {
        clearInterval(intervalId);
        alert("Time is Up");
        setStart(false);
        setCountDown("00:00:00");
      }
    }, 1000);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-blue-500">
      <div className="w-[350px] p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Set Timer</h2>
        <div className="flex justify-between items-center space-x-2 mb-4">
          <input
            type="number"
            placeholder="hh"
            onChange={(e) => {
              const num = parseInt(e.target.value);
              setHours(num);
            }}
            value={hours}
            required
            className="w-full text-center border border-gray-300 rounded-md py-3 transition duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none"
          />
          <input
            type="number"
            placeholder="mm"
            onChange={(e) => {
              const num = parseInt(e.target.value);
              setMinutes(num);
            }}
            value={minutes}
            required
            className="w-full text-center border border-gray-300 rounded-md py-3 transition duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none"
          />
          <input
            type="number"
            placeholder="ss"
            onChange={(e) => {
              const num = parseInt(e.target.value);
              setSecond(num);
            }}
            value={second}
            required
            className="w-full text-center border border-gray-300 rounded-md py-3 transition duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none"
          />
        </div>
        <button
          onClick={() => {
            // let newobj={
            //   id:uuidv4(),
            //   countDown:countDown
            // }
            // setTask([...task,newobj]);
            setStart(true);
            setAlaram(hours, minutes, second);
            setHours('')
            setMinutes('')
            setSecond('')
          }}
          className="mt-4 w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition duration-300 shadow-md focus:outline-none"
        >
          Set Time
        </button>
      </div>
    {start && (
  <div className="text-2xl font-semibold text-white bg-blue-600 px-4 py-2 rounded-md shadow-lg mt-4">
    CountDown: {countDown}
  </div>
)}

    </div>
  );
};

export default Inputs;
