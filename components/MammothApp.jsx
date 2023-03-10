import { useState } from 'react';
import MammothStage from './MammothCounter/MammothStage';

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

  const handleSelect = (event) => {
    setTimes(event.target.value);
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
      <div className="mammoth-controls-container flex flex-col justify-center">
        <label htmlFor="select-count" className="mb-2 text-sm font-medium text-gray-900">How many mammoths?
        </label>
        <div className="mammoth-controls flex flex-row space-x-5">
          <select id="select-count" className="bg-gray-50 border" onChange={handleSelect} disabled={started & ! finished}>
            {
              selectElms
            }
          </select>
          <button className="btn btn-blue" onClick={handleClick} disabled={started && !finished }>
            {
              started && !finished ?
                "Crossing" : "Cross"
            }
          </button>
        </div>
      </div>
      <MammothStage times={times} started={started} finishedCallback={finishedCallback}/>
    </>)
}