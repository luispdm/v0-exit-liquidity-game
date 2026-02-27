"use client";

import { cn } from "@/lib/utils";
import type { Card, Attribute } from "@/lib/cards";

interface GameCardProps {
  card: Card;
  faceDown?: boolean;
  selected?: boolean;
  highlighted?: Attribute | null;
  onClick?: () => void;
  disabled?: boolean;
  size?: "sm" | "md";
  winner?: boolean;
}

export function GameCard({
  card,
  faceDown = false,
  selected = false,
  highlighted = null,
  onClick,
  disabled = false,
  size = "md",
  winner,
}: GameCardProps) {
  if (faceDown) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-lg border-2 border-border bg-secondary font-mono select-none",
          size === "md" ? "h-52 w-36" : "h-40 w-28",
        )}
      >
        <div className="flex flex-col items-center gap-1 text-muted-foreground">
          <span className={cn("font-bold", size === "md" ? "text-2xl" : "text-lg")}>{"?"}</span>
          <span className={cn(size === "md" ? "text-xs" : "text-[10px]")}>HIDDEN</span>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex flex-col rounded-lg border-2 text-left transition-all font-mono select-none",
        size === "md" ? "h-52 w-36 p-2" : "h-40 w-28 p-1.5",
        winner === true
          ? "border-green-400 ring-2 ring-green-400/50 bg-card"
          : winner === false
            ? "border-red-400/60 bg-card"
            : selected
              ? "border-primary bg-primary/10 ring-2 ring-primary/50"
              : "border-border bg-card hover:border-primary/50",
        disabled && !selected && "opacity-60 cursor-default",
        !disabled && "cursor-pointer hover:scale-105",
      )}
    >
      <p
        className={cn(
          "font-bold text-primary truncate w-full",
          size === "md" ? "text-xs mb-1" : "text-[10px] mb-0.5",
        )}
      >
        {card.name}
      </p>
      <pre
        className={cn(
          "flex-1 overflow-hidden leading-tight text-muted-foreground",
          size === "md" ? "text-[8px]" : "text-[6px]",
        )}
      >
        {card.ascii}
      </pre>
      <div
        className={cn(
          "grid grid-cols-2 gap-x-2 gap-y-0.5 border-t border-border pt-1 mt-1",
          size === "md" ? "text-[10px]" : "text-[8px]",
        )}
      >
        <StatRow label="PRC" value={card.price} active={highlighted === "price"} />
        <StatRow label="SPD" value={card.speed} active={highlighted === "speed"} />
        <StatRow label="HCK" value={card.hack} active={highlighted === "hack"} />
        <StatRow label="CLT" value={card.cult} active={highlighted === "cult"} />
      </div>
    </button>
  );
}

function StatRow({ label, value, active }: { label: string; value: number; active: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between",
        active ? "text-primary font-bold" : "text-card-foreground/70",
      )}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

export function CardBack({ count, size = "md" }: { count: number; size?: "sm" | "md" }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: Math.min(count, 5) }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex items-center justify-center rounded-lg border-2 border-border bg-secondary font-mono select-none",
            size === "md" ? "h-52 w-36" : "h-40 w-28",
          )}
        >
          <div className="flex flex-col items-center gap-1 text-muted-foreground">
            <span className={cn("font-bold", size === "md" ? "text-2xl" : "text-lg")}>{"?"}</span>
            <span className={cn(size === "md" ? "text-xs" : "text-[10px]")}>HIDDEN</span>
          </div>
        </div>
      ))}
      {count > 5 && (
        <span className="text-muted-foreground text-sm font-mono">+{count - 5}</span>
      )}
    </div>
  );
}
