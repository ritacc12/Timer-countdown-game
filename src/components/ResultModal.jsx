//forwardRef lets your component expose a DOM node to parent component with a ref.
import { forwardRef, useImperativeHandle, useRef } from "react";

const ResultModal = forwardRef(function ResultModal(
  { result, targetTime, remainingTime, onReset },
  ref
) {
  const dialog = useRef();

  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = (1 - remainingTime / (targetTime * 1000)) * 100;

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return (
    // built-in dialog by default is invisible , but it can be made visible by adding open prop to it
    <dialog ref={dialog} className="result-modal">
      {userLost && <h2>You lost</h2>}
      {!userLost && <h2>You score : {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds</strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{formattedRemainingTime} seconds left</strong>{" "}
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ResultModal;
