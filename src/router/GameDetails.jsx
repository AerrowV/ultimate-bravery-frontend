import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Wheel } from "react-roulette-pro";

const GameDetails = () => {
  const { id } = useParams();
  const [strategies, setStrategies] = useState([]);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://ultimatebravery.yumiya.dk/api/games/${id}`)
      .then((res) => res.json())
      .then((data) => setStrategies(data))
      .catch((err) => setError("Failed to load strategies: " + err.message));
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!strategies.length) return <p>Loading strategies...</p>;

  // Convert strategies into wheel-friendly format
  const data = strategies.map((strat) => ({
    option: strat.name,
  }));

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  return (
    <div style={{ textAlign: "center", paddingTop: "2rem" }}>
      <h1 className="text-2xl font-bold mb-4">Strategy Roulette</h1>

      <div style={{ margin: "0 auto", width: "300px" }}>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          onStopSpinning={() => setMustSpin(false)}
          backgroundColors={["#3e3e3e", "#df3428"]}
          textColors={["#ffffff"]}
        />
      </div>

      <button
        onClick={handleSpinClick}
        className="mt-6 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded"
      >
        🎰 Spin for Random Strategy
      </button>

      {mustSpin === false && data[prizeNumber] && (
        <div className="mt-6 text-xl">
          <strong>Selected Strategy:</strong> {data[prizeNumber].option}
        </div>
      )}
    </div>
  );
};

export default GameDetails;
