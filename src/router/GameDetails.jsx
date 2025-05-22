import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RoulettePro from "react-roulette-pro";
import "react-roulette-pro/dist/index.css";
import Confetti from "react-confetti";

import styles from "./GameDetails.module.css";

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

const generateId = () => `${Date.now().toString(36)}-${Math.random().toString(36).substring(2)}`;

export default function GameDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

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
    const f = strategies.filter(
      (s) =>
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

    if (filtered.length === 0) {
      setPrizeList([]);
      return;
    }

    const base = filtered.map(makePrize);
    const duplicates = Array(base.length * 3)
      .fill()
      .map(() => {
        const strategy = filtered[Math.floor(Math.random() * filtered.length)];
        return makePrize(strategy);
      });

    const full = [...base, ...duplicates, ...base].map((p) => ({ ...p, id: generateId() }));
    setPrizeList(full);
  }, [filtered]);

  const handleStart = () => {
    if (!filtered.length) {
      alert("No strategies match filters");
      return;
    }

    const candidateIndexes = prizeList
      .map((p, i) => ({ index: i, strategy: p.strategy }))
      .filter(
        (entry) =>
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
      setSelected(strat);
      setHistory((h) => [strat, ...h]);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
    setStart(false);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <h1 className={styles.title}>Strategy Roulette</h1>

      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

      <div style={{ marginBottom: 20, position: "relative", zIndex: 10 }}>
        <select
          value={mapFilter || ""}
          onChange={(e) => setMapFilter(e.target.value || null)}
          style={{ marginRight: 10, padding: "0.5rem 1rem", borderRadius: 6, fontSize: 16 }}
        >
          <option value="">All Maps</option>
          {Object.entries(mapNames).map(([id, name]) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          style={{ padding: "0.5rem 1rem", borderRadius: 6, fontSize: 16 }}
        >
          <option value="">All Types</option>
          <option value="TROLL">TROLL</option>
          <option value="AVERAGE">AVERAGE</option>
          <option value="SERIOUS">SERIOUS</option>
        </select>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 10 }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            width: 4,
            height: 60,
            backgroundColor: "red",
            borderRadius: 8,
            transform: "translateX(-50%)",
            zIndex: 20,
            boxShadow: "0 0 10px red",
          }}
        />
        <RoulettePro
          prizes={prizeList}
          prizeIndex={prizeIndex}
          start={start}
          onPrizeDefined={handlePrizeDefined}
          spinningTime={7}
          options={{ stopInCenter: true }}
        />
      </div>

      <button onClick={handleStart} disabled={start} className={styles.button}>
        🌀 Spin for Strategy
      </button>

      {selected && (
        <div className={styles.strategyCard}>
          <h2>🎯 Selected Strategy</h2>
          <p>
            <strong>Title:</strong> {selected.title}
          </p>
          <p style={{ whiteSpace: "pre-wrap" }}>
            <strong>Description:</strong> {selected.description}
          </p>
          <p>
            <strong>Type:</strong> {selected.type}
          </p>
          <p>
            <strong>Map:</strong> {selected.mapIds.map((id) => mapNames[id]).join(", ")}
          </p>
        </div>
      )}

      {history.length > 0 && (
        <div className={styles.historyList}>
          <h3>📜 Strategy History</h3>
          <ul>
            {history.map((s, i) => (
              <li key={i}>
                {s.title} ({mapNames[s.mapIds[0]]}) - {s.type}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={() => navigate("/games")} className={styles.button}>
        ← Back to Games
      </button>

      {showConfetti && containerRef.current && (
        <Confetti
          width={containerRef.current.clientWidth}
          height={containerRef.current.clientHeight}
          recycle={false}
          numberOfPieces={150}
        />
      )}
    </div>
  );
}
