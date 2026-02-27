"use client";

import { useState, useCallback } from "react";
import { StartScreen } from "@/components/start-screen";
import { GameBoard } from "@/components/game-board";

type Screen = "start" | "game";

export default function Page() {
  const [screen, setScreen] = useState<Screen>("start");
  const [gameKey, setGameKey] = useState(0);
  const [opponentName, setOpponentName] = useState("");

  const handleStart = useCallback((name: string) => {
    setOpponentName(name);
    setGameKey((k) => k + 1);
    setScreen("game");
  }, []);

  const handleQuit = useCallback(() => {
    setScreen("start");
  }, []);

  if (screen === "game") {
    return <GameBoard key={gameKey} onQuit={handleQuit} opponentName={opponentName} />;
  }

  return <StartScreen onStart={handleStart} />;
}
