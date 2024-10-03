import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
let taskss=[]
const Inputs = () => {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [second, setSecond] = useState("");
  const[task,setTask]=useState(taskss)
 useEffect(()=>{
  let IntervalId;
   if(task.length>0 && task[task.length-1].run){
    IntervalId=setInterval(()=>{
      setTask((prevTask)=>
        prevTask.map((t)=>{
          if(t.run){
            let totalSec=t.hours*3600+t.minutes*60+t.second;
           if(totalSec>0){
            totalSec--;
            let hh=Math.floor(totalSec/3600)
            let mm=Math.floor((totalSec%3600)/60)
            let ss=Math.floor(totalSec%60)
            return{
              ...t,
              hours:hh,
              minutes:mm,
              second:ss,
              countDown:`${hh.toString().padStart(2,'0')}:${mm.toString().padStart(2,'0')}:${ss.toString().padStart(2,'0')}`,
            };
           }
           else{
            clearInterval(IntervalId);
            return {...t,run:false,countDown:'00:00:00'}
           }

          }
         
          return t;
        })
      )
    },1000)

   }
   return ()=>clearInterval(IntervalId)
 },[task])
 function addTask(){
  let newObj={
    id:uuidv4(),
    hours:hours||0,
    minutes:minutes||0,
    second:second||0,
    countDown:`${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${second.toString().padStart(2,'0')}`,
    run:true
  }
  setTask([...task,newObj])
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
          onClick={addTask}
          className="mt-4 w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition duration-300 shadow-md focus:outline-none"
        >
          Set Time
        </button>
      </div>
      <div className="w-full max-w-md mt-8 p-4 bg-white rounded-lg shadow-md">
  <h3 className="text-xl font-bold text-gray-800 mb-4">Tasks Countdown</h3>
  <div className="flex flex-col space-y-3">
    {task.length > 0 &&
      task.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between px-4 py-2 border border-gray-200 rounded-md bg-blue-50 shadow-sm"
        >
          <span className="text-gray-700 font-medium">CountDown:</span>
          <span className="text-lg font-semibold text-blue-800">
            {item.countDown}
          </span>
        </div>
      ))}
  </div>
</div>

    </div>
  );
};

export default Inputs;



















