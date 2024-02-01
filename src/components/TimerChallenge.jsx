export default function TimeChallenge({ title, targetTime }) {
  return (
    <section className="challenge">
      <h2>{title}</h2>
      <p className="challenge-time">{targetTime} second</p>
      <p>
        <button>Start</button>
      </p>
      <p className="">Time is running</p>
    </section>
  );
}
