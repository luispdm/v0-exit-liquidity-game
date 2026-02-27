import { Card, Attribute, CARDS, validateDeck, type ValidationError } from "./cards";

// ============================================================
// GAME STATE TYPES
// ============================================================

export type Phase =
  | "PICK_ATTRIBUTE"
  | "HUMAN_SELECT"
  | "CPU_SELECT"
  | "REVEAL"
  | "RESOLVE"
  | "REFILL"
  | "NEXT_ROUND"
  | "GAME_OVER";

export type Picker = "human" | "cpu";

export interface GameState {
  phase: Phase;
  round: number;
  picker: Picker;
  humanHand: Card[];
  cpuHand: Card[];
  drawPile: Card[];
  humanDumped: Card[];
  cpuDumped: Card[];
  selectedAttribute: Attribute | null;
  humanPlayedCard: Card | null;
  cpuPlayedCard: Card | null;
  winner: "human" | "cpu" | null;
  opponentName: string;
  log: string[];
  validationErrors: ValidationError[];
}

// ============================================================
// OPPONENT NAME GENERATOR
// ============================================================

const OPPONENT_BASES = [
  "Binance", "FTX", "Coinbase", "Kraken", "OKX", "Bybit",
  "BitMEX", "Gemini", "Jump", "Alameda", "Cumberland",
  "Wintermute", "GSR", "dYdX", "3AC", "Celsius", "BlockFi",
  "Voyager", "Terra", "Luna Foundation",
];

const OPPONENT_SUFFIXES = [
  "(Definitely Not CZ)", "'Liquidity'", ".exe", "(Trust Us Bro)",
  "Capital (lol)", "Labs (in shambles)", "Research (bankrupt)",
  "(We're Fine)", "Trading (rekt)", "Ventures (ngmi)",
  "(wen audit?)", "Protocol (unaudited)", "(DYOR)",
  "(not financial advice)", "DAO (1 of 1 multisig)",
];

export function generateOpponentName(): string {
  const base = OPPONENT_BASES[Math.floor(Math.random() * OPPONENT_BASES.length)];
  const suffix = OPPONENT_SUFFIXES[Math.floor(Math.random() * OPPONENT_SUFFIXES.length)];
  return `${base} ${suffix}`;
}

// ============================================================
// DEGEN EVENT LOG PHRASES
// ============================================================

const DUMP_PHRASES = [
  "dumped that bag like a pro exit liquidity provider",
  "successfully rugged themselves. Based.",
  "is no longer a bagholder for this one",
  "said 'ngmi' and meant it",
  "exited liquidity. Absolute degen move.",
  "sent that shitcoin to the shadow realm",
  "dumped faster than Luna/UST",
  "paperhanded successfully for once",
  "is free from this particular ponzi",
];

const BAGHOLD_PHRASES = [
  "is still bagholding. Down bad.",
  "couldn't dump. Rekt.",
  "is stuck with the bags. NGMI.",
  "diamond-handed against their will",
  "forced to hodl. Pain.",
  "got exit liquidity'd. Classic.",
  "still holding. Someone call the liquidator.",
  "has heavy bags. F in chat.",
];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ============================================================
// SHUFFLE
// ============================================================

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ============================================================
// INITIALIZE GAME
// ============================================================

export function initGame(): GameState {
  const errors = validateDeck(CARDS);
  if (errors.length > 0) {
    return {
      phase: "GAME_OVER",
      round: 0,
      picker: "human",
      humanHand: [],
      cpuHand: [],
      drawPile: [],
      humanDumped: [],
      cpuDumped: [],
      selectedAttribute: null,
      humanPlayedCard: null,
      cpuPlayedCard: null,
      winner: null,
      opponentName: generateOpponentName(),
      log: ["DECK VALIDATION FAILED. Cannot start match."],
      validationErrors: errors,
    };
  }

  const deck = shuffle(CARDS);
  const humanHand = deck.slice(0, 5);
  const cpuHand = deck.slice(5, 10);
  const drawPile = deck.slice(10);

  return {
    phase: "PICK_ATTRIBUTE",
    round: 1,
    picker: "human",
    humanHand,
    cpuHand,
    drawPile,
    humanDumped: [],
    cpuDumped: [],
    selectedAttribute: null,
    humanPlayedCard: null,
    cpuPlayedCard: null,
    winner: null,
    opponentName: generateOpponentName(),
    log: ["Match started. You pick the attribute first. Let's see who dumps faster."],
    validationErrors: [],
  };
}

// ============================================================
// ACTIONS
// ============================================================

function checkWin(state: GameState): GameState {
  if (state.humanHand.length === 0) {
    return {
      ...state,
      phase: "GAME_OVER",
      winner: "human",
      log: [...state.log, "YOU EXITED LIQUIDITY. All bags dumped. GG."],
    };
  }
  if (state.cpuHand.length === 0) {
    return {
      ...state,
      phase: "GAME_OVER",
      winner: "cpu",
      log: [...state.log, `${state.opponentName} EXITED LIQUIDITY. They dumped all their bags first.`],
    };
  }
  return state;
}

export function pickAttribute(state: GameState, attr: Attribute): GameState {
  if (state.phase !== "PICK_ATTRIBUTE") return state;

  const nextPhase: Phase = state.picker === "human" ? "HUMAN_SELECT" : "CPU_SELECT";

  return {
    ...state,
    selectedAttribute: attr,
    phase: nextPhase,
    log: [
      ...state.log,
      `${state.picker === "human" ? "You" : state.opponentName} picked "${attr}" — lowest value wins this round.`,
    ],
  };
}

export function cpuPickAttribute(state: GameState): GameState {
  const attrs: Attribute[] = ["price", "speed", "hack", "cult"];
  const attr = randomFrom(attrs);
  return pickAttribute(state, attr);
}

export function humanSelectCard(state: GameState, cardId: string): GameState {
  if (state.phase !== "HUMAN_SELECT") return state;
  const card = state.humanHand.find((c) => c.id === cardId);
  if (!card) return state;

  return {
    ...state,
    humanPlayedCard: card,
    humanHand: state.humanHand.filter((c) => c.id !== cardId),
    phase: "CPU_SELECT",
  };
}

export function cpuSelectCard(state: GameState): GameState {
  if (state.phase !== "CPU_SELECT") return state;
  if (!state.humanPlayedCard) return state;

  const card = randomFrom(state.cpuHand);

  return {
    ...state,
    cpuPlayedCard: card,
    cpuHand: state.cpuHand.filter((c) => c.id !== card.id),
    phase: "REVEAL",
  };
}

export function reveal(state: GameState): GameState {
  if (state.phase !== "REVEAL") return state;
  return { ...state, phase: "RESOLVE" };
}

export function resolve(state: GameState): GameState {
  if (state.phase !== "RESOLVE") return state;
  if (!state.humanPlayedCard || !state.cpuPlayedCard || !state.selectedAttribute) return state;

  const attr = state.selectedAttribute;
  const humanVal = state.humanPlayedCard[attr];
  const cpuVal = state.cpuPlayedCard[attr];

  // LOWER value wins (dumps their card)
  const humanWins = humanVal < cpuVal;

  let newHumanHand = [...state.humanHand];
  let newCpuHand = [...state.cpuHand];
  let newHumanDumped = [...state.humanDumped];
  let newCpuDumped = [...state.cpuDumped];
  const newLog = [...state.log];

  if (humanWins) {
    // Human dumps their card (it goes to dumped pile), CPU gets their card back
    newHumanDumped.push(state.humanPlayedCard);
    newCpuHand.push(state.cpuPlayedCard);
    newLog.push(
      `${state.humanPlayedCard.name} (${attr}: ${humanVal}) vs ${state.cpuPlayedCard.name} (${attr}: ${cpuVal}) — You ${randomFrom(DUMP_PHRASES)}`
    );
  } else {
    // CPU dumps their card, human gets their card back
    newCpuDumped.push(state.cpuPlayedCard);
    newHumanHand.push(state.humanPlayedCard);
    newLog.push(
      `${state.humanPlayedCard.name} (${attr}: ${humanVal}) vs ${state.cpuPlayedCard.name} (${attr}: ${cpuVal}) — You ${randomFrom(BAGHOLD_PHRASES)}`
    );
  }

  let newState: GameState = {
    ...state,
    humanHand: newHumanHand,
    cpuHand: newCpuHand,
    humanDumped: newHumanDumped,
    cpuDumped: newCpuDumped,
    log: newLog,
    phase: "REFILL",
  };

  // Check for win immediately after resolve
  newState = checkWin(newState);
  return newState;
}

export function refill(state: GameState): GameState {
  if (state.phase !== "REFILL") return state;

  let newHumanHand = [...state.humanHand];
  let newCpuHand = [...state.cpuHand];
  let newDrawPile = [...state.drawPile];

  // Refill human to 5
  while (newHumanHand.length < 5 && newDrawPile.length > 0) {
    newHumanHand.push(newDrawPile.shift()!);
  }
  // Refill cpu to 5
  while (newCpuHand.length < 5 && newDrawPile.length > 0) {
    newCpuHand.push(newDrawPile.shift()!);
  }

  let newState: GameState = {
    ...state,
    humanHand: newHumanHand,
    cpuHand: newCpuHand,
    drawPile: newDrawPile,
    phase: "NEXT_ROUND",
  };

  // Check for win after refill too
  newState = checkWin(newState);
  return newState;
}

export function nextRound(state: GameState): GameState {
  if (state.phase !== "NEXT_ROUND") return state;

  return {
    ...state,
    round: state.round + 1,
    picker: state.picker === "human" ? "cpu" : "human",
    selectedAttribute: null,
    humanPlayedCard: null,
    cpuPlayedCard: null,
    phase: "PICK_ATTRIBUTE",
    log: [
      ...state.log,
      `--- Round ${state.round + 1} --- ${state.picker === "human" ? state.opponentName : "You"} pick${state.picker === "human" ? "s" : ""} the attribute.`,
    ],
  };
}
