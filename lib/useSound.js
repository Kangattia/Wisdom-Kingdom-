"use client";

import { useRef, useCallback } from "react";

const SOUND_URLS = {
  correct: "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg",
  wrong: "https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg",
  click: "https://actions.google.com/sounds/v1/buttons/button_click.ogg",
  background: "https://actions.google.com/sounds/v1/ambiences/arcade_room.ogg",
  victory: "https://actions.google.com/sounds/v1/cartoon/concussive_drum_hit.ogg",
};

// Returns a `play(name)` function. Audio objects are created lazily on first
// use (never during server render) and reused after that. All playback
// errors (blocked autoplay, network hiccup, missing file) are swallowed so a
// sound problem can never freeze game logic.
export function useSound() {
  const cache = useRef({});

  const play = useCallback((name) => {
    if (typeof window === "undefined") return;
    if (!cache.current[name]) {
      const audio = new Audio(SOUND_URLS[name]);
      if (name === "background") {
        audio.loop = true;
        audio.volume = 0.3;
      }
      if (name === "victory") {
        audio.volume = 0.5;
      }
      cache.current[name] = audio;
    }
    try {
      const p = cache.current[name].play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    } catch (e) {
      // ignore - a sound glitch should never break the game
    }
  }, []);

  return play;
}
