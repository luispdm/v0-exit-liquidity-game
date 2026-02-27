// ============================================================
// PASTE FINAL CARDS HERE
// Each card needs: id, name, image (path in public/coins/), price, speed, hack, cult
// Rules: 30 cards total, each stat 1..100, unique values per attribute
// ============================================================

export interface Card {
  id: string;
  name: string;
  image: string;
  price: number;
  speed: number;
  hack: number;
  cult: number;
}

export type Attribute = "price" | "speed" | "hack" | "cult";

// 30 Bavarian food-themed shitcoin cards with unique stats per attribute
export const CARDS: Card[] = [
  { id: "c01", name: "$WEISSWURST INU", image: "/coins/01_Weißwurst_Inu.png", price: 3, speed: 88, hack: 45, cult: 72 },
  { id: "c02", name: "$BREZN PEPE", image: "/coins/02_Brezn_Pepe.png", price: 15, speed: 42, hack: 91, cult: 8 },
  { id: "c03", name: "$OBAZDA WIF", image: "/coins/03_Obazda_Wif.png", price: 67, speed: 5, hack: 23, cult: 95 },
  { id: "c04", name: "$LEBERKÄSE CHAD", image: "/coins/04_Leberkäse_Chad.png", price: 91, speed: 73, hack: 12, cult: 34 },
  { id: "c05", name: "$SCHWEINSHAXE BASED", image: "/coins/05_Schweinshaxe_Based.png", price: 28, speed: 19, hack: 77, cult: 51 },
  { id: "c06", name: "$SEMMELKNÖDEL GM", image: "/coins/06_Semmelknödel_GM.png", price: 44, speed: 96, hack: 33, cult: 14 },
  { id: "c07", name: "$KARTOFFELKNÖDEL WAGMI", image: "/coins/07_Kartoffelknödel_WAGMI.png", price: 82, speed: 31, hack: 58, cult: 89 },
  { id: "c08", name: "$DAMPFNUDEL NGMI", image: "/coins/08_Dampfnudel_NGMI.png", price: 56, speed: 67, hack: 4, cult: 27 },
  { id: "c09", name: "$KAISERSCHMARRN JEET", image: "/coins/09_Kaiserschmarrn_Jeet.png", price: 7, speed: 54, hack: 86, cult: 63 },
  { id: "c10", name: "$ZWETSCHGENDATSCHI RUG", image: "/coins/10_Zwetschgendatschi_Rug.png", price: 39, speed: 11, hack: 69, cult: 41 },
  { id: "c11", name: "$AUSZOGNE PUMP", image: "/coins/11_Auszogne_Pump.png", price: 73, speed: 82, hack: 17, cult: 56 },
  { id: "c12", name: "$RAHMSCHWAMMERL DUMP", image: "/coins/12_Rahmschwammerl_Dump.png", price: 21, speed: 28, hack: 94, cult: 3 },
  { id: "c13", name: "$STECKERLFISCH MOON", image: "/coins/13_Steckerlfisch_Moon.png", price: 95, speed: 46, hack: 51, cult: 82 },
  { id: "c14", name: "$RADI LAMBO", image: "/coins/14_Radi_Lambo.png", price: 12, speed: 91, hack: 28, cult: 19 },
  { id: "c15", name: "$WAMMERL DIAMONDHANDS", image: "/coins/15_Wammerl_DiamondHands.png", price: 58, speed: 14, hack: 73, cult: 46 },
  { id: "c16", name: "$KÄSESPÄTZLE PAPERHANDS", image: "/coins/16_Käsespätzle_PaperHands.png", price: 34, speed: 77, hack: 8, cult: 97 },
  { id: "c17", name: "$SCHWEINSBRATEN APE", image: "/coins/17_Schweinsbraten_Ape.png", price: 100, speed: 3, hack: 62, cult: 11 },
  { id: "c18", name: "$HENDL FOMO", image: "/coins/18_Hendl_FOMO.png", price: 47, speed: 59, hack: 36, cult: 68 },
  { id: "c19", name: "$LEBERKNÖDELSUPPE FUD", image: "/coins/19_Leberknödelsuppe_FUD.png", price: 85, speed: 36, hack: 100, cult: 22 },
  { id: "c20", name: "$REIBERDATSCHI REKT", image: "/coins/20_Reiberdatschi_Rekt.png", price: 62, speed: 100, hack: 19, cult: 38 },
  { id: "c21", name: "$SCHUPFNUDELN ALPHA", image: "/coins/21_Schupfnudeln_Alpha.png", price: 9, speed: 22, hack: 82, cult: 77 },
  { id: "c22", name: "$PRESSSACK BETA", image: "/coins/22_Presssack_Beta.png", price: 77, speed: 85, hack: 41, cult: 5 },
  { id: "c23", name: "$BROTZEIT DEGEN", image: "/coins/23_Brotzeit_Degen.png", price: 51, speed: 8, hack: 56, cult: 91 },
  { id: "c24", name: "$BREZENKNÖDEL SHILL", image: "/coins/24_Brezenknödel_Shill.png", price: 19, speed: 63, hack: 3, cult: 59 },
  { id: "c25", name: "$WEISSBIER WHALE", image: "/coins/25_Weißbier_Whale.png", price: 88, speed: 47, hack: 67, cult: 30 },
  { id: "c26", name: "$HELLES AIRDROP", image: "/coins/26_Helles_Airdrop.png", price: 30, speed: 71, hack: 14, cult: 85 },
  { id: "c27", name: "$RADLER GAS", image: "/coins/27_Radler_Gas.png", price: 71, speed: 39, hack: 47, cult: 16 },
  { id: "c28", name: "$SCHMALZNUDEL HODL", image: "/coins/28_Schmalznudel_HODL.png", price: 42, speed: 56, hack: 90, cult: 44 },
  { id: "c29", name: "$FLEISCHPFLANZERL GIGA", image: "/coins/29_Fleischpflanzerl_Giga.png", price: 5, speed: 34, hack: 30, cult: 100 },
  { id: "c30", name: "$BAYERISCH CREME LIQUIDITY", image: "/coins/30_Bayerisch_Creme_Liquidity.png", price: 36, speed: 15, hack: 55, cult: 53 },
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
