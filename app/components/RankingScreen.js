"use client";

import { useEffect, useState } from "react";

export default function RankingScreen({ onBack }) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/leaderboard")
      .then((res) => {
        if (!res.ok) throw new Error("bad response");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          setPlayers(Array.isArray(data) ? data : []);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="container" id="rankingScreen">
      <h2>🏆 Kingdom Rankings</h2>

      <div id="rankingList">
        {loading && <p>Loading rankings...</p>}
        {error && <p>Couldn&apos;t load rankings. Try again shortly.</p>}
        {!loading && !error && players.length === 0 && (
          <p>No kingdoms have risen yet. Be the first!</p>
        )}
        {!loading &&
          !error &&
          players.map((player, index) => (
            <p className="rankingRow" key={player.username}>
              {index + 1}. 👑 {player.username} - {player.title} -{" "}
              {player.totalPoints} pts
            </p>
          ))}
      </div>

      <button id="backRankingBtn" onClick={onBack}>
        ⬅ Back
      </button>
    </div>
  );
}
