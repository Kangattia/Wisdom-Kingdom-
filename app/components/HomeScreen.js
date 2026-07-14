"use client";

import { useState } from "react";

const CATEGORIES = [
  { key: "History", label: "🌍 History", id: "historyBtn" },
  { key: "Bible", label: "✝️ Bible", id: "bibleBtn" },
  { key: "Science", label: "🔬 Science", id: "scienceBtn" },
  { key: "Geography", label: "🌍 Geography", id: "geographyBtn" },
];

export default function HomeScreen({
  playerProfile,
  selectedCategory,
  onSelectCategory,
  onPlay,
  onShowRanking,
}) {
  const [nameInput, setNameInput] = useState(playerProfile.username || "");

  function handlePlay() {
    const trimmed = nameInput.trim();
    if (trimmed === "") {
      alert("👑 Enter your kingdom name to continue!");
      return;
    }
    onPlay(trimmed);
  }

  return (
    <div className="container" id="homeScreen">
      <h1>👑 Wisdom Kingdom</h1>

      <input
        id="playerNameInput"
        type="text"
        placeholder="Enter your kingdom name"
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
      />

      <div id="playerCard">
        <p id="playerTitle">⚔️ Rank: {playerProfile.title}</p>
        <p id="playerPoints">🏆 Total Points: {playerProfile.totalPoints}</p>
        <p id="playerLevels">
          📚 Levels Completed: {playerProfile.levelsCompleted}
        </p>
      </div>

      <p className="subtitle">The Kingdom of Knowledge Awaits</p>
      <p id="selectedText">Selected: {selectedCategory}</p>

      {CATEGORIES.map((cat) => (
        <button
          key={cat.key}
          id={cat.id}
          className={selectedCategory === cat.key ? "selected" : ""}
          onClick={() => onSelectCategory(cat.key)}
        >
          {cat.label}
        </button>
      ))}

      <button id="playBtn" onClick={handlePlay}>
        ▶ Play
      </button>
      <button id="rankingBtn" onClick={onShowRanking}>
        🏆 Kingdom Rankings
      </button>

      <p className="version">Version 0.1</p>
    </div>
  );
          }
