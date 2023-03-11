import { useState, ChangeEvent } from 'react';
import MammothCounter from './MammothCounter/MammothCounter';

const tailwindClasses = {
  container: "flex flex-col items-center justify-center mt-1 mb-0 mx-auto",
  label: "mt-1 mb-0 text-sm font-medium text-gray-900",
  button: "mt-1 mb-0 px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50",
  select: "bg-gray-50 border",
}

export default function MammothApp() {
  const [times, setTimes] = useState(1); // how many mammoths to count
  // when stated but not finished, we disable the controls
  // once finished, started should be set to false again
  // When set to true, we can start the animation (again)
  const [started, setStarted] = useState(false); 
  // When finished, we show the end message
  // The message will disappear when the user clicks the button again
  const [finished, setFinished] = useState(false); 

  const handleClick = () => {
    if(!started) {
      setStarted(true);
    } 
  };

  const handleSelect = (event: ChangeEvent) => {
    setTimes(parseInt((event!.target as HTMLInputElement).value, 10));
  };

  // This should reset `started` to false
  // to allow the animation to begin again.
  const finishedCallback = () => {
    setStarted(false); // ready to start again
    setFinished(true); // show the end message
  };

  const selectElms = [];
  for (let i = 1; i < 16; i++) {
    selectElms.push(
      <option key={i} value={i}>{i}</option>
    );
  }

  return (
    <>
      <div className={tailwindClasses.container}>
        <label htmlFor="select-count" className={tailwindClasses.label}>How many mammoths?</label>
        <div className="flex flex-row space-x-5 my-2 my-auto">
          <select id="select-count" aria-label="How many mammoths?" className={tailwindClasses.select} onChange={handleSelect} disabled={started && ! finished}>
            {
              selectElms
            }
          </select>
          <button className={tailwindClasses.button} onClick={handleClick} disabled={started && !finished }>
            {
              started && !finished ?
                "Crossing" : "Cross"
            }
          </button>
        </div>
      </div>
      <MammothCounter times={times} started={started} finishedCallback={finishedCallback}/>
    </>)
}