"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { generateOpponentName } from "@/lib/game-engine";

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  const [opponentName, setOpponentName] = useState(() => generateOpponentName());

  const reroll = useCallback(() => {
    setOpponentName(generateOpponentName());
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="flex flex-col items-center gap-8 max-w-md w-full">
        {/* Title */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl font-bold font-mono text-primary tracking-tight text-balance text-center">
            EXIT LIQUIDITY
          </h1>
          <p className="text-sm font-mono text-muted-foreground text-center text-pretty leading-relaxed">
            Dump your shitcoin bags before the market maker does. Lowest stat wins. First to empty their hand exits liquidity.
          </p>
        </div>

        {/* How to Play */}
        <div className="w-full border border-border rounded-lg p-4 bg-card">
          <h2 className="text-xs font-mono font-bold text-primary mb-3 uppercase tracking-wider">How to Play</h2>
          <ul className="space-y-2 text-xs font-mono text-muted-foreground leading-relaxed">
            <li className="flex gap-2">
              <span className="text-primary shrink-0">01</span>
              <span>Each round, the picker chooses an attribute to compare.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary shrink-0">02</span>
              <span>Both sides play a card face-down, then reveal.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary shrink-0">03</span>
              <span>The LOWER value wins and DUMPS their card onto the loser.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary shrink-0">04</span>
              <span>The loser takes their own card back AND the winner's dumped card.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary shrink-0">05</span>
              <span>First to empty their hand exits liquidity and wins.</span>
            </li>
          </ul>
        </div>

        {/* Opponent */}
        <div className="w-full border border-border rounded-lg p-4 bg-card flex flex-col items-center gap-3">
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Your Opponent</p>
          <p className="text-sm font-mono font-bold text-accent text-center">{opponentName}</p>
          <Button
            variant="ghost"
            size="sm"
            className="text-[10px] font-mono text-muted-foreground"
            onClick={reroll}
          >
            Reroll Opponent
          </Button>
        </div>

        {/* Start Button */}
        <Button
          onClick={onStart}
          size="lg"
          className="w-full font-mono text-sm tracking-wider"
        >
          NEW GAME
        </Button>

        <p className="text-[10px] font-mono text-muted-foreground/50 text-center">
          NFA. DYOR. Not responsible for virtual bag losses.
        </p>
      </div>
    </div>
  );
}
