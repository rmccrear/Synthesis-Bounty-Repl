import { useState, useEffect, CSSProperties } from "react";
import CountingStage from "./CountingStage";
import Mammoth from "./Mammoth";
import config from "./mammoth.config";
import grassOverlayImg from "../../public/assets/grass.svg";
const { crossingTime, displayWidth } = config;

const tailwindClasses = {
  finshedCount: "text-amber-500 text-2xl text-center",
  mammothStageContainer: "relative h-[150px]",
};

const styles : Record<string, CSSProperties> = {
  grassOverlay: {
    backgroundImage: `url(${grassOverlayImg.src})`,
    backgroundRepeat: "repeat-x",
    backgroundPosition: "fill",
    backgroundSize: "cover",
    height: "150px",
    position: "absolute",
    top: "0px",
    width: "100%",
  }
}

// started: time when the mammoth started crossing
// This will be called every 250 ms to check how many times the mammoth should have crossed by now.
const checkTime = (started: number, tickCount: number, callback: Function) => {
  if (Date.now() / 1000 - tickCount * crossingTime > started) {
    callback();
  }
}

export default function MammothCounter({times, started, finishedCallback} : {times: number, started: boolean, finishedCallback?: Function}) {
  const [crossing, setCrossing] = useState(false);
  const [startedTime, setStartedTime] = useState(0); // in seconds
  const [currentCount, setCurrentCount] = useState(0);
  const [tickCount, setTickCount] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (tickCount <= times) {
      setCurrentCount(tickCount);
    } else {
      setCrossing(false);
      setCurrentCount(0);
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
    if (started) {
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
    <div className="overflow-hidden" style={{ width: displayWidth }} >
      <div className={tailwindClasses.mammothStageContainer}>
          {
            mammoths
          }
          <div style={styles.grassOverlay}></div>
      </div>
      {isDone ?
        <div className={tailwindClasses.finshedCount}>
          {times} mammoth{times > 1 ? "s" : ""}!
        </div>
        : <CountingStage currentCount={currentCount} />
      }

    </div>
  );
}