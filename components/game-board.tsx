"use client";

import { useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { GameCard } from "@/components/game-card";
import { useGame } from "@/hooks/use-game";
import type { Attribute } from "@/lib/cards";

const ATTRIBUTE_LABELS: Record<Attribute, string> = {
  price: "Price",
  speed: "Speed",
  hack: "Hack",
  cult: "Cult",
};

export function GameBoard({ onQuit }: { onQuit: () => void }) {
  const {
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
  } = useGame();

  const logEndRef = useRef<HTMLDivElement>(null);

  // Start game on mount
  useEffect(() => {
    startGame();
  }, [startGame]);

  // Auto-scroll log
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state?.log.length]);

  // CPU auto-actions with delays
  useEffect(() => {
    if (!state) return;

    // CPU picks attribute
    if (state.phase === "PICK_ATTRIBUTE" && state.picker === "cpu") {
      scheduleAction(doCpuPickAttribute, 1000);
    }

    // CPU selects card
    if (state.phase === "CPU_SELECT" && state.humanPlayedCard) {
      scheduleAction(doCpuSelectCard, 800);
    }

    // Auto-reveal after CPU selects
    if (state.phase === "REVEAL") {
      scheduleAction(doReveal, 100);
    }

    // Auto-advance through resolve -> refill -> next with delays
    if (state.phase === "RESOLVE") {
      scheduleAction(doResolve, 100);
    }
  }, [state?.phase, state?.picker, state?.humanPlayedCard, scheduleAction, doCpuPickAttribute, doCpuSelectCard, doReveal, doResolve]);

  const handlePickAttribute = useCallback(
    (attr: Attribute) => {
      doPickAttribute(attr);
    },
    [doPickAttribute],
  );

  const handleSelectCard = useCallback(
    (cardId: string) => {
      doHumanSelectCard(cardId);
    },
    [doHumanSelectCard],
  );

  const handleAdvance = useCallback(() => {
    if (!state) return;
    if (state.phase === "NEXT_ROUND") {
      doNextRound();
    }
  }, [state, doNextRound]);

  if (!state) return null;

  // Validation error screen
  if (state.validationErrors.length > 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="max-w-lg w-full bg-accent/20 border-2 border-accent rounded-lg p-6">
          <h2 className="text-xl font-bold text-accent mb-4">Deck Validation Failed</h2>
          <ul className="space-y-2">
            {state.validationErrors.map((err, i) => (
              <li key={i} className="text-sm text-accent/80 font-mono">
                <span className="text-accent font-bold">[{err.field}]</span> {err.message}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  const isGameOver = state.phase === "GAME_OVER";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-bold text-primary font-mono tracking-wide">EXIT LIQUIDITY</h1>
          <Badge variant="outline" className="font-mono text-xs">
            vs {state.opponentName}
          </Badge>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
          <span>R{state.round}</span>
          <span className="text-foreground/50">|</span>
          <span>Picker: <span className="text-primary">{state.picker === "human" ? "YOU" : state.opponentName}</span></span>
          <span className="text-foreground/50">|</span>
          <span className="text-primary">You dumped: {state.humanDumped.length}</span>
          <span className="text-foreground/50">/</span>
          <span className="text-accent">They dumped: {state.cpuDumped.length}</span>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="flex-1 flex flex-col lg:flex-row">
        {/* Game Board */}
        <div className="flex-1 flex flex-col p-4 gap-4">
          {/* Opponent Hand */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">
                {state.opponentName}
              </h2>
              <Badge variant="secondary" className="text-[10px] font-mono">
                {state.cpuHand.length} cards
              </Badge>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {state.cpuHand.map((_, i) => (
                <GameCard key={i} card={state.cpuHand[0]} faceDown size="sm" />
              ))}
            </div>
          </section>

          {/* Attribute Selection */}
          {state.phase === "PICK_ATTRIBUTE" && (
            <section className="flex flex-col items-center gap-3 py-4">
              <p className="text-sm font-mono text-muted-foreground">
                {state.picker === "human"
                  ? "Pick an attribute (lowest value wins):"
                  : `${state.opponentName} is picking...`}
              </p>
              {state.picker === "human" && (
                <div className="flex gap-2">
                  {(["price", "speed", "hack", "cult"] as Attribute[]).map((attr) => (
                    <Button
                      key={attr}
                      variant="outline"
                      size="sm"
                      className="font-mono text-xs border-primary/50 hover:bg-primary hover:text-primary-foreground"
                      onClick={() => handlePickAttribute(attr)}
                    >
                      {ATTRIBUTE_LABELS[attr]}
                    </Button>
                  ))}
                </div>
              )}
              {state.picker === "cpu" && (
                <div className="flex gap-2">
                  <div className="h-8 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse [animation-delay:200ms]" />
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse [animation-delay:400ms]" />
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Reveal / Battle Area */}
          {(state.phase === "REVEAL" ||
            state.phase === "RESOLVE" ||
            state.phase === "NEXT_ROUND") &&
            state.humanPlayedCard &&
            state.cpuPlayedCard && (
              <section className="flex flex-col items-center gap-3 py-2">
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                  <span>Comparing:</span>
                  <Badge variant="default" className="text-[10px]">
                    {state.selectedAttribute ? ATTRIBUTE_LABELS[state.selectedAttribute] : ""}
                  </Badge>
                  <span>(lowest wins)</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[10px] font-mono text-primary font-bold uppercase">You</span>
                    <GameCard
                      card={state.humanPlayedCard}
                      highlighted={state.selectedAttribute}
                      disabled
                      size="md"
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold text-muted-foreground font-mono">VS</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[10px] font-mono text-accent font-bold uppercase truncate max-w-[120px]">{state.opponentName}</span>
                    <GameCard
                      card={state.cpuPlayedCard}
                      highlighted={state.selectedAttribute}
                      disabled
                      size="md"
                    />
                  </div>
                </div>

                {/* Advance buttons */}
                {state.phase === "NEXT_ROUND" && (
                  <Button
                    onClick={handleAdvance}
                    className="mt-2 font-mono text-xs"
                    size="sm"
                  >
                    Next Round
                  </Button>
                )}
              </section>
            )}

          {/* Select Card Prompt */}
          {(state.phase === "HUMAN_SELECT" || (state.phase === "CPU_SELECT" && !state.humanPlayedCard)) && (
            <div className="flex items-center justify-center py-4">
              <p className="text-sm font-mono text-primary animate-pulse">
                Select a card from your hand to play face-down
              </p>
            </div>
          )}

          {state.phase === "CPU_SELECT" && state.humanPlayedCard && (
            <div className="flex items-center justify-center py-4 gap-2">
              <span className="text-sm font-mono text-muted-foreground">
                Opponent is selecting a card...
              </span>
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            </div>
          )}

          {/* Player Hand */}
          <section className="mt-auto">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-xs font-mono font-bold text-primary uppercase tracking-wider">
                Your Hand
              </h2>
              <Badge variant="secondary" className="text-[10px] font-mono">
                {state.humanHand.length} cards
              </Badge>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {state.humanHand.map((card) => (
                <GameCard
                  key={card.id}
                  card={card}
                  highlighted={state.selectedAttribute}
                  onClick={() => handleSelectCard(card.id)}
                  disabled={state.phase !== "HUMAN_SELECT"}
                  size="md"
                />
              ))}
              {state.humanHand.length === 0 && (
                <p className="text-sm font-mono text-primary py-4">All bags dumped!</p>
              )}
            </div>
          </section>
        </div>

        {/* Event Log Sidebar */}
        <aside className="lg:w-72 border-t lg:border-t-0 lg:border-l border-border bg-secondary/20">
          <div className="flex items-center justify-between px-4 py-2 border-b border-border">
            <h3 className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">
              Event Log
            </h3>
            <Button variant="ghost" size="sm" className="text-[10px] font-mono text-muted-foreground h-6" onClick={onQuit}>
              Quit
            </Button>
          </div>
          <ScrollArea className="h-48 lg:h-[calc(100vh-10rem)]">
            <div className="p-3 space-y-1.5">
              {state.log.map((entry, i) => (
                <p key={i} className="text-[11px] font-mono text-muted-foreground leading-relaxed">
                  <span className="text-primary/50">[{String(i + 1).padStart(2, "0")}]</span>{" "}
                  {entry}
                </p>
              ))}
              <div ref={logEndRef} />
            </div>
          </ScrollArea>
        </aside>
      </main>

      {/* Win Modal */}
      <Dialog open={isGameOver} onOpenChange={() => {}}>
        <DialogContent showCloseButton={false} className="bg-card border-primary/30">
          <DialogHeader>
            <DialogTitle className="text-center font-mono text-xl">
              {state.winner === "human" ? (
                <span className="text-primary">YOU EXITED LIQUIDITY</span>
              ) : (
                <span className="text-accent">{state.opponentName} EXITED LIQUIDITY</span>
              )}
            </DialogTitle>
            <DialogDescription className="text-center font-mono text-sm">
              {state.winner === "human"
                ? "All bags dumped. You are free. (For now.)"
                : "They dumped their bags before you. Absolute degen move."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-2 py-4 font-mono text-xs text-muted-foreground">
            <p>Rounds played: {state.round}</p>
            <p>You dumped: {state.humanDumped.length} | They dumped: {state.cpuDumped.length}</p>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button onClick={onQuit} className="font-mono">
              Play Again
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
