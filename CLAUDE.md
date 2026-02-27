# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Dev server on localhost:3000
npm run build    # Production build
npm run lint     # ESLint
```

No test framework configured.

## Architecture

Client-only Next.js 16 card game ("Exit Liquidity"). Single player vs CPU. No backend, no database, no auth.

### Core Files

- `lib/game-engine.ts` — Pure-function state machine. All game logic lives here. Phases: `PICK_ATTRIBUTE → HUMAN_SELECT → CPU_SELECT → REVEAL → RESOLVE → NEXT_ROUND → GAME_OVER`.
- `lib/cards.ts` — 30 crypto-themed card definitions. Each card has 4 attributes (price, speed, hack, cult) with values 1-100, unique per attribute across all cards.
- `hooks/use-game.ts` — React hook wrapping game-engine. Manages `GameState` via `useState`, exposes action dispatchers, handles CPU delays with `setTimeout`.
- `components/game-board.tsx` — Main game UI. Auto-advances phases with timed delays (CPU attribute pick 1s, card select 800ms, reveal/resolve 100ms).
- `components/game-card.tsx` — Card display with ASCII art, stats, face-down variant.
- `components/start-screen.tsx` — Opponent name generator + rules display.
- `app/page.tsx` — Screen router (start vs game).

### Game Mechanics

- 30 cards split between 2 players (currently 5 each at start)
- Picker chooses attribute → both play cards → **lower value wins** (dumps card)
- Winner's card transfers to loser's hand (hot potato)
- First to empty hand wins
- CPU uses random card selection

### Stack

- Next.js 16, React 19, TypeScript 5.7
- Tailwind CSS v4 with OKLCH color scheme (dark theme)
- shadcn/ui (new-york style) — 59 components in `components/ui/`
- Path alias: `@/*` → project root

### Config Notes

- `next.config.mjs`: TypeScript build errors ignored, image optimization disabled
- `components.json`: shadcn/ui config (new-york style, lucide icons, RSC enabled)
