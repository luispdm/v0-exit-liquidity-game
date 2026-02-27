"use client";

import { useState, useCallback, useRef } from "react";
import type { Attribute } from "@/lib/cards";
import {
  type GameState,
  initGame,
  pickAttribute,
  cpuPickAttribute,
  humanSelectCard,
  cpuSelectCard,
  reveal,
  resolve,
  nextRound,
} from "@/lib/game-engine";

export function useGame() {
  const [state, setState] = useState<GameState | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const startGame = useCallback((opponentName?: string) => {
    clearTimers();
    setState(initGame(opponentName));
  }, [clearTimers]);

  const doPickAttribute = useCallback((attr: Attribute) => {
    setState((prev) => {
      if (!prev) return prev;
      return pickAttribute(prev, attr);
    });
  }, []);

  const doCpuPickAttribute = useCallback(() => {
    setState((prev) => {
      if (!prev) return prev;
      return cpuPickAttribute(prev);
    });
  }, []);

  const doHumanSelectCard = useCallback((cardId: string) => {
    setState((prev) => {
      if (!prev) return prev;
      return humanSelectCard(prev, cardId);
    });
  }, []);

  const doCpuSelectCard = useCallback(() => {
    setState((prev) => {
      if (!prev) return prev;
      return cpuSelectCard(prev);
    });
  }, []);

  const doReveal = useCallback(() => {
    setState((prev) => {
      if (!prev) return prev;
      return reveal(prev);
    });
  }, []);

  const doResolve = useCallback(() => {
    setState((prev) => {
      if (!prev) return prev;
      return resolve(prev);
    });
  }, []);

  const doNextRound = useCallback(() => {
    setState((prev) => {
      if (!prev) return prev;
      return nextRound(prev);
    });
  }, []);

  // Auto-advance helper: schedule a delayed action
  const scheduleAction = useCallback((fn: () => void, delayMs: number) => {
    clearTimers();
    timeoutRef.current = setTimeout(fn, delayMs);
  }, [clearTimers]);

  return {
    state,
    startGame,
    doPickAttribute,
    doCpuPickAttribute,
    doHumanSelectCard,
    doCpuSelectCard,
    doReveal,
    doResolve,
    doNextRound,
    scheduleAction,
  };
}
