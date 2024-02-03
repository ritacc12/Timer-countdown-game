import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimeChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();

  const [timeStarted, setTimeStarted] = useState(false);
  const [timeExpired, setTimeExpired] = useState(false);

  function handleStart() {
    timer.current = setTimeout(() => {
      setTimeExpired(true);
      //calling ResultModal open method
      dialog.current.open();
    }, targetTime * 1000);

    setTimeStarted(true);
  }

  function handleStop() {
    clearTimeout(timer.current);
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
          <button onClick={timeStarted ? handleStop : handleStart}>
            {timeStarted ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timeStarted ? "active" : undefined}>
          {timeStarted ? "Time is running" : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
