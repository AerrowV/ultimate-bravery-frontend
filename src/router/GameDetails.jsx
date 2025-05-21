import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import RoulettePro from "react-roulette-pro";
import "react-roulette-pro/dist/index.css";
import Confetti from "react-confetti";

const mapNames = {
  1: "Ancient",
  2: "Mirage",
  3: "Inferno",
  4: "Nuke",
  5: "Overpass",
  6: "Vertigo",
};

const typeImages = {
  TROLL: "https://pbs.twimg.com/profile_images/1704835779875446784/MHatXc-y_400x400.jpg",
  AVERAGE:
    "https://thumbnail.imgbin.com/25/25/2/imgbin-pepe-the-frog-gun-shows-in-the-united-states-firearm-weapon-weapon-pepe-the-frog-xHrJKCQ5uHtr2gr4SzN7c8k5v_t.jpg",
  SERIOUS:
    "https://toppng.com/uploads/preview/295kib-1024x1096-jaded-neckbeard-pepe-gamer-pepe-11563122924pzktupwzzx.png",
};

const generateId = () => `${Date.now().toString(36)}-${Math.random().toString(36).substring(2)}`;

const GameDetails = () => {
  const { id } = useParams();
  const [strategies, setStrategies] = useState([]);
  const [mapFilter, setMapFilter] = useState(0);
  const [typeFilter, setTypeFilter] = useState("");
  const [prizeList, setPrizeList] = useState([]);
  const [start, setStart] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(0);
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    fetch("https://ultimatebravery.yumiya.dk/api/strategies")
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) throw new Error("API returned invalid format");
        setStrategies(data);
        setPrizeList(generatePrizeList(data));
      })
      .catch((err) => setError("Failed to load strategies: " + err.message));
  }, []);

  const generatePrizeList = (strategyArray) => {
    const basePrizes = strategyArray.map((strat) => ({
      id: generateId(),
      image: typeImages[strat.type] || typeImages.TROLL,
      strategy: strat,
    }));
    return [
      ...basePrizes,
      ...Array(basePrizes.length)
        .fill()
        .map(() => basePrizes[Math.floor(Math.random() * basePrizes.length)]),
      ...basePrizes,
    ].map((prize) => ({ ...prize, id: generateId() }));
  };

  const handleStart = () => {
    const filtered = strategies.filter(
      (s) =>
        (!mapFilter || s.mapIds.includes(parseInt(mapFilter))) &&
        (!typeFilter || s.type === typeFilter)
    );
    if (filtered.length === 0) return alert("No strategies match filters");

    const randomStrat = filtered[Math.floor(Math.random() * filtered.length)];
    const index = prizeList.findIndex((item) => item.strategy?.id === randomStrat.id);

    setPrizeIndex(index > 0 ? index : 0);
    setSelectedStrategy(null);
    setShowConfetti(false);
    setStart(true);
  };

  const handlePrizeDefined = () => {
    const strategy = prizeList[prizeIndex]?.strategy;
    if (strategy) {
      setSelectedStrategy(strategy); // always update description
      setHistory((prev) => [strategy, ...prev]);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
    setStart(false);
  };

  return (
    <div className="p-6 text-center relative" ref={containerRef}>
      <h1 className="text-3xl font-bold mb-6">Strategy Roulette</h1>

      {error && <p className="mb-4 text-red-600">{error}</p>}

      <div className="flex justify-center gap-4 mb-4">
        <select
          className="border p-2 rounded"
          value={mapFilter}
          onChange={(e) => setMapFilter(e.target.value)}
        >
          <option value={0}>All Maps</option>
          {Object.entries(mapNames).map(([id, name]) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="TROLL">TROLL</option>
          <option value="AVERAGE">AVERAGE</option>
          <option value="SERIOUS">SERIOUS</option>
        </select>
      </div>

      {showConfetti && containerRef.current && (
        <Confetti
          width={containerRef.current.clientWidth}
          height={containerRef.current.clientHeight}
          recycle={false}
          numberOfPieces={150}
        />
      )}

      <div className="relative mx-auto w-full max-w-lg aspect-square">
        {/* Center indicator line */}
        <div className="absolute top-1/2 left-1/2 w-1 h-10 bg-red-600 rounded shadow-md transform -translate-x-1/2 -translate-y-full z-10"></div>

        <RoulettePro
          prizes={prizeList}
          prizeIndex={prizeIndex}
          start={start}
          onPrizeDefined={handlePrizeDefined}
          spinningTime={7}
          options={{ stopInCenter: true }}
        />
      </div>

      <button
        onClick={handleStart}
        className="mt-6 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded"
        disabled={start}
      >
        🎰 Spin for Strategy
      </button>

      {selectedStrategy && (
        <div className="mt-8 text-left max-w-xl mx-auto bg-gray-100 p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2">🎯 Selected Strategy</h2>
          <p>
            <strong>Title:</strong> {selectedStrategy.title}
          </p>
          <p>
            <strong>Description:</strong> {selectedStrategy.description}
          </p>
          <p>
            <strong>Type:</strong> {selectedStrategy.type}
          </p>
          <p>
            <strong>Map:</strong>{" "}
            {selectedStrategy.mapIds.map((id) => mapNames[id]).join(", ")}
          </p>
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-10 text-left max-w-xl mx-auto">
          <h2 className="text-lg font-semibold mb-2">📜 Strategy History</h2>
          <ul className="list-disc pl-6">
            {history.map((h, i) => (
              <li key={i}>{h.title} ({mapNames[h.mapIds[0]]}) - {h.type}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GameDetails;
