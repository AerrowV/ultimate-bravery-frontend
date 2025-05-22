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
  TROLL: "/images/roulette/troll.png",
  AVERAGE: "/images/roulette/average.png",
  SERIOUS: "/images/roulette/serious.png",
};

const backgroundImageUrl = "https://profilerr.net/static/content/thumbs/1456x/3/c2/hstmjm-3299df49bf1f0b6f404aee30b6ccec23.webp";

const generateId = () => `${Date.now().toString(36)}-${Math.random().toString(36).substring(2)}`;

export default function GameDetails() {
  const { id } = useParams();
  const [strategies, setStrategies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [mapFilter, setMapFilter] = useState(null);
  const [typeFilter, setTypeFilter] = useState("");
  const [prizeList, setPrizeList] = useState([]);
  const [start, setStart] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const containerRef = useRef(null);
  const selectedRef = useRef(null);

  useEffect(() => {
    fetch("https://ultimatebravery.yumiya.dk/api/strategies")
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) throw new Error("Invalid API format");
        setStrategies(data);
      })
      .catch((err) => setError("Failed to load strategies: " + err.message));
  }, [id]);

  useEffect(() => {
    const f = strategies.filter((s) =>
      (mapFilter ? s.mapIds.includes(Number(mapFilter)) : true) &&
      (typeFilter ? s.type === typeFilter : true)
    );
    setFiltered(f);
  }, [strategies, mapFilter, typeFilter]);

useEffect(() => {
  const makePrize = (strategy) => ({
    id: generateId(),
    image: typeImages[strategy.type] || typeImages.SERIOUS,
    text: strategy.title,
    strategy,
  });

  const base = filtered.map(makePrize);

  const duplicates = Array(base.length * 3)
    .fill()
    .map(() => {
      const strategy = filtered[Math.floor(Math.random() * filtered.length)];
      return makePrize(strategy);
    });

  const full = [...base, ...duplicates, ...base].map((p) => ({
    ...p,
    id: generateId(),
  }));

  setPrizeList(full);
}, [filtered]);

const handleStart = () => {
  if (!filtered.length) {
    alert("No strategies match filters");
    return;
  }

  const candidateIndexes = prizeList
    .map((p, i) => ({ index: i, strategy: p.strategy }))
    .filter((entry) =>
      (!mapFilter || entry.strategy.mapIds.includes(Number(mapFilter))) &&
      (!typeFilter || entry.strategy.type === typeFilter)
    );

  if (candidateIndexes.length === 0) {
    alert("No matching strategies on the wheel");
    return;
  }

  const randomPick = candidateIndexes[Math.floor(Math.random() * candidateIndexes.length)];

  selectedRef.current = randomPick.strategy;
  setPrizeIndex(randomPick.index);    
  setSelected(null);       
  setShowConfetti(false); 
  setStart(true);                            
};


  const handlePrizeDefined = () => {
    const strat = selectedRef.current;
    if (strat) {
      console.log("Selected strategy:", strat); // DEBUG
      setSelected(strat);
      setHistory((h) => [strat, ...h]);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
    setStart(false);
  };

  return (
    <div className="relative min-h-screen text-center text-white overflow-x-hidden" ref={containerRef}>
      
      {/* 🔁 Baggrundsbillede */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          opacity: 0.5,
        }}
      />

      {/* 🎉 Konfetti */}
      <div className="flex justify-center gap-4 mb-4">
        <select
          className="border p-2 rounded"
          value={mapFilter || ""}
          onChange={(e) => setMapFilter(e.target.value || null)}
        >
          <option value="">All Maps</option>
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
        <div className="absolute top-1/2 left-1/2 w-1 h-10 bg-red-600 rounded shadow-md transform -translate-x-1/2 -translate-y-full z-10" />
        <RoulettePro
          prizes={prizeList}
          prizeIndex={prizeIndex}
          start={start}
          onPrizeDefined={handlePrizeDefined}
          spinningTime={7}
          options={{
            stopInCenter: true,
            withoutAnimation: !start,
          }}
        />
      </div>

      <button
        onClick={handleStart}
        disabled={start}
        className="mt-6 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded disabled:opacity-50"
      >
        Spin for Strategy
      </button>

      {selected && (
        <div className="mt-8 text-left max-w-xl mx-auto bg-gray-100 p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Selected Strategy</h2>
          <p><strong>Title:</strong> {selected.title}</p>
          <p><strong>Description:</strong> {selected.description}</p>
          <p><strong>Type:</strong> {selected.type}</p>
          <p><strong>Map:</strong> {selected.mapIds.map(id => mapNames[id]).join(', ')}</p>
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-10 text-left max-w-xl mx-auto">
          <h2 className="text-lg font-semibold mb-2">Strategy History</h2>
          <ul className="list-disc pl-6">
            {history.map((s, i) => (
              <li key={i}>{s.title} ({mapNames[s.mapIds[0]]}) - {s.type}</li>
            ))}
          </select>

          <select
            className="border p-2 rounded text-black"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="TROLL">TROLL</option>
            <option value="AVERAGE">AVERAGE</option>
            <option value="SERIOUS">SERIOUS</option>
          </select>
        </div>

        {/* 🎰 Roulette */}
        <div className="relative mx-auto w-full max-w-lg aspect-square">
          <div className="absolute top-1/2 left-1/2 w-1 h-10 bg-red-600 rounded shadow transform -translate-x-1/2 -translate-y-full z-10" />
          <RoulettePro
            prizes={prizeList}
            prizeIndex={prizeIndex}
            start={start}
            onPrizeDefined={handlePrizeDefined}
            spinningTime={7}
            options={{
              stopInCenter: true,
              withoutAnimation: !start,
            }}
          />
        </div>

        {/* 🎯 Start knap */}
        <button
          onClick={handleStart}
          disabled={start}
          className="mt-6 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded disabled:opacity-50"
        >
          🎰 Spin for Strategy
        </button>

        {/* ✅ Resultat */}
        {selected && (
          <div className="mt-8 text-left max-w-xl mx-auto bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded shadow-lg text-white">
            <h2 className="text-xl font-bold mb-2">🎯 Selected Strategy</h2>
            <p><strong>Title:</strong> {selected.title}</p>
            <p className="whitespace-pre-wrap break-words">
              <strong>Description:</strong> {selected.description}
            </p>
            <p><strong>Type:</strong> {selected.type}</p>
            <p><strong>Map:</strong> {selected.mapIds.map(id => mapNames[id]).join(', ')}</p>
          </div>
        )}

        {/* 🕘 Historik */}
        {history.length > 0 && (
          <div className="mt-10 text-left max-w-xl mx-auto bg-white bg-opacity-10 backdrop-blur-sm p-4 rounded shadow text-white">
            <h2 className="text-lg font-semibold mb-2">📜 Strategy History</h2>
            <ul className="list-disc pl-6">
              {history.map((s, i) => (
                <li key={i}>{s.title} ({mapNames[s.mapIds[0]]}) - {s.type}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}