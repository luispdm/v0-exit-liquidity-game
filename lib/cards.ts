// ============================================================
// PASTE FINAL CARDS HERE
// Each card needs: id, name, ascii (multiline string), price, speed, hack, cult
// Rules: 30 cards total, each stat 1..100, unique values per attribute
// ============================================================

export interface Card {
  id: string;
  name: string;
  ascii: string;
  price: number;
  speed: number;
  hack: number;
  cult: number;
}

export type Attribute = "price" | "speed" | "hack" | "cult";

// Placeholder 30 shitcoin cards with unique stats per attribute
export const CARDS: Card[] = [
  { id: "c01", name: "$RUGPULL", ascii: "  /\\_/\\\n ( o.o )\n  > ^ <\n /|   |\\\n(_|   |_)", price: 3, speed: 88, hack: 45, cult: 72 },
  { id: "c02", name: "$MOONBOI", ascii: "   ___\n  /   \\\n | O O |\n |  ^  |\n  \\___/", price: 15, speed: 42, hack: 91, cult: 8 },
  { id: "c03", name: "$ELONDOGE", ascii: "  .__.\n (o  o)\n  (  )\n  _||_\n /    \\", price: 67, speed: 5, hack: 23, cult: 95 },
  { id: "c04", name: "$SAFU", ascii: " [====]\n |SAFE|\n |    |\n |____|\n /    \\", price: 91, speed: 73, hack: 12, cult: 34 },
  { id: "c05", name: "$WAGMI", ascii: "  \\  /\n   \\/\n   /\\\n  /  \\\n /    \\", price: 28, speed: 19, hack: 77, cult: 51 },
  { id: "c06", name: "$NGMI", ascii: "  ____\n /    \\\n| NGMI |\n \\____/\n  |  |", price: 44, speed: 96, hack: 33, cult: 14 },
  { id: "c07", name: "$FOMO", ascii: "  !!!!!\n  |   |\n  | $ |\n  |   |\n  !!!!!", price: 82, speed: 31, hack: 58, cult: 89 },
  { id: "c08", name: "$APE", ascii: "  .--.\n /    \\\n| (oo) |\n \\    /\n  '--'", price: 56, speed: 67, hack: 4, cult: 27 },
  { id: "c09", name: "$REKT", ascii: " ______\n|      |\n| REKT |\n|______|\n  ||||", price: 7, speed: 54, hack: 86, cult: 63 },
  { id: "c10", name: "$HODL", ascii: "  /.\\. \n | H |\n | O |\n | D |\n  \\_/", price: 39, speed: 11, hack: 69, cult: 41 },
  { id: "c11", name: "$PUMP", ascii: "   /|\n  / |\n /  |\n/   |\n____|", price: 73, speed: 82, hack: 17, cult: 56 },
  { id: "c12", name: "$DUMP", ascii: "____\n|   \\\n|    \\\n|     \\\n|______\\", price: 21, speed: 28, hack: 94, cult: 3 },
  { id: "c13", name: "$DEGEN", ascii: "  ***\n *   *\n* D G *\n *   *\n  ***", price: 95, speed: 46, hack: 51, cult: 82 },
  { id: "c14", name: "$COPIUM", ascii: " .---.\n/ COP \\\n| IUM |\n\\_____/\n  | |", price: 12, speed: 91, hack: 28, cult: 19 },
  { id: "c15", name: "$SHILL", ascii: "  /$$$\n |$ $ |\n | $ $|\n |$$$|\n  ---", price: 58, speed: 14, hack: 73, cult: 46 },
  { id: "c16", name: "$ANON", ascii: "  ???\n ?   ?\n? A N ?\n ?   ?\n  ???", price: 34, speed: 77, hack: 8, cult: 97 },
  { id: "c17", name: "$WHALE", ascii: "    __\n __|  |__\n|        |\n|  ~~~~  |\n \\_____/", price: 100, speed: 3, hack: 62, cult: 11 },
  { id: "c18", name: "$GWEI", ascii: "  {G}\n  |W|\n  |E|\n  |I|\n  {_}", price: 47, speed: 59, hack: 36, cult: 68 },
  { id: "c19", name: "$FLOOR", ascii: " _____\n|     |\n| FLR |\n|_____|\n=====", price: 85, speed: 36, hack: 100, cult: 22 },
  { id: "c20", name: "$JPEG", ascii: "  .--.\n /    \\\n| JPEG |\n \\    /\n  '--'", price: 62, speed: 100, hack: 19, cult: 38 },
  { id: "c21", name: "$ALPHA", ascii: "  /\\\n /  \\\n/ALPH\\\n\\    /\n \\  /", price: 9, speed: 22, hack: 82, cult: 77 },
  { id: "c22", name: "$BRIDGE", ascii: " __|__\n/     \\\n| BRG |\n\\_____/\n |   |", price: 77, speed: 85, hack: 41, cult: 5 },
  { id: "c23", name: "$YIELD", ascii: "  %%%\n %   %\n% YLD %\n %   %\n  %%%", price: 51, speed: 8, hack: 56, cult: 91 },
  { id: "c24", name: "$GAS", ascii: " [===]\n | G |\n | A |\n | S |\n [===]", price: 19, speed: 63, hack: 3, cult: 59 },
  { id: "c25", name: "$MINT", ascii: "  .-.\n | M |\n | I |\n | N |\n  '-'", price: 88, speed: 47, hack: 67, cult: 30 },
  { id: "c26", name: "$AIRDROP", ascii: "  \\ | /\n   \\|/\n  --*--\n   /|\\\n  / | \\", price: 30, speed: 71, hack: 14, cult: 85 },
  { id: "c27", name: "$FORK", ascii: "   |\n   |\n  /|\\\n / | \\\n/  |  \\", price: 71, speed: 39, hack: 47, cult: 16 },
  { id: "c28", name: "$MEMPOOL", ascii: "  ~~~~~\n ~MEM~ \n ~POOL~\n ~~~~~\n  ===", price: 42, speed: 56, hack: 90, cult: 44 },
  { id: "c29", name: "$ORACLE", ascii: "  .O.\n / | \\\n| ORC |\n \\ | /\n  'O'", price: 5, speed: 34, hack: 30, cult: 100 },
  { id: "c30", name: "$LAYER2", ascii: " [L2]\n |  |\n | >> |\n |  |\n [L2]", price: 36, speed: 15, hack: 55, cult: 53 },
];

// ============================================================
// VALIDATION
// ============================================================

export interface ValidationError {
  field: string;
  message: string;
}

export function validateDeck(cards: Card[]): ValidationError[] {
  const errors: ValidationError[] = [];

  if (cards.length !== 30) {
    errors.push({ field: "deck", message: `Deck must have exactly 30 cards, got ${cards.length}.` });
  }

  const attributes: Attribute[] = ["price", "speed", "hack", "cult"];

  for (const attr of attributes) {
    const values = cards.map((c) => c[attr]);

    // Check range 1..100
    for (let i = 0; i < values.length; i++) {
      if (values[i] < 1 || values[i] > 100) {
        errors.push({
          field: attr,
          message: `Card "${cards[i].name}" has ${attr}=${values[i]}, must be 1..100.`,
        });
      }
    }

    // Check uniqueness
    const seen = new Set<number>();
    for (let i = 0; i < values.length; i++) {
      if (seen.has(values[i])) {
        errors.push({
          field: attr,
          message: `Duplicate ${attr} value ${values[i]} found on card "${cards[i].name}".`,
        });
      }
      seen.add(values[i]);
    }
  }

  return errors;
}
