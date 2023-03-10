import CountingFigure from "./CountingFigure";

export default function CountingStage({ currentCount } : { currentCount: number }) {
  const highCount = 20;
  const countingFigures = [];
  for (let i = 0; i < highCount; i++) {
    countingFigures.push(<CountingFigure key={i} count={i + 1} isTarget={i+1 === currentCount} />);
  }
  return (
    <div className="counting-stage flex flex-row justify-around">
      {
        countingFigures
      }
    </div>
  );
}