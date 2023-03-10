import { useState, useEffect } from "react";
import CountingStage from "./CountingStage";
import Mammoth from "./Mammoth";
import config from "../mammoth.config";
const { crossingTime } = config;

// stated: seconds
const checkTime = (started, tickCount, callback) => {
  if (Date.now() / 1000 - tickCount * crossingTime > started) {
    callback();
  }
}

export default function MammothStage({times, started, finishedCallback}) {
  const [crossing, setCrossing] = useState(false);
  const [startedTime, setStartedTime] = useState(null); // in seconds
  const [currentCount, setCurrentCount] = useState(null);
  const [tickCount, setTickCount] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (tickCount <= times) {
      setCurrentCount(tickCount);
    } else {
      setCrossing(false);
      setCurrentCount(null);
      setIsDone(true);
      if(finishedCallback) {
        finishedCallback();
      }
    }
  }, [tickCount, setCurrentCount])

  // This acts as a timer to update how many seconds*crossingTime have gone by.
  // Crossing time is how long it takes for the mammoth to cross the screen.
  // (It might be better to do all of this as one CSS transition triggered by
  // a class change. The transition could then set visibility on the pointer hand.)
  useEffect(() => {
    const myPid = setInterval(() => {
      if (crossing) {
        checkTime(startedTime, tickCount, () => {
          setTickCount(tickCount + 1);
        })
      }
    }, 250);
    return () => {
      clearInterval(myPid);
    }
  }, [crossing, tickCount, startedTime])

  useEffect(() => {
    console.log("started changed to", started)
    if (started) {
      console.log("started is true, setting started time to", Date.now() / 1000);
      setIsDone(false);
      setCrossing(true);
      setTickCount(0);
      setStartedTime(Date.now() / 1000);
    }
  }, [started]);


  useEffect(()=>{
    reset();
  }, [times]);

  const reset = () => {
    setIsDone(false);
    setTickCount(0);
    setCrossing(false);
    setCurrentCount(0);
  }

  const mammoths = [];
  for (let i = 0; i < times; i++) {
    mammoths.push(
      <Mammoth
        key={i}
        count={i}
        crossing={crossing}
        totalCount={times}
      />
    );
  }

  return (
    <>
      <div className="mammoth-stage-container">
        <div className="mammoth-stage">
          {
            mammoths
          }
          <div className="grass-overlay"></div>
        </div>
      </div>
      {isDone ?
        <div className="finished-count">
          {times} mammoth{times > 1 ? "s" : ""}!
        </div>
        : <CountingStage currentCount={currentCount} />
      }

    </>
  );
}