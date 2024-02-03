import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimeChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();

  const [timeRemaining, setRemaining] = useState(targetTime * 1000);

  const timeIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  // if expired , cause this function to run again
  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    setRemaining(targetTime * 1000);
    dialog.current.open(); //time expired and the game lost
  }

  function handleStart() {
    //deduct the 10 milliseconds from the current time remaining
    timer.current = setInterval(() => {
      setRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  }

  function handleStop() {
    // user manually stopped the timer and won
    dialog.current.open();
    // 呼應setInterval
    clearInterval(timer.current);
  }

  return (
    <>
      {timeExpired && (
        <ResultModal ref={dialog} targetTime={targetTime} result="lost" />
      )}
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timeIsActive ? handleStop : handleStart}>
            {timeIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timeIsActive ? "active" : undefined}>
          {timeIsActive ? "Time is running" : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
