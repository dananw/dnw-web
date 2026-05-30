const WORDS = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "enim",
  "ad",
  "minim",
  "veniam",
  "quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "aliquip",
  "ex",
  "ea",
  "commodo",
  "consequat",
  "duis",
  "aute",
  "irure",
  "in",
  "reprehenderit",
  "voluptate",
  "velit",
  "esse",
  "cillum",
  "fugiat",
  "nulla",
  "pariatur",
  "excepteur",
  "sint",
  "occaecat",
  "cupidatat",
  "non",
  "proident",
  "sunt",
  "culpa",
  "qui",
  "officia",
  "deserunt",
  "mollit",
  "anim",
  "id",
  "est",
  "laborum",
];

export type LoremUnit = "paragraphs" | "sentences" | "words";

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeSentence(): string {
  const len = rand(6, 14);
  const words: string[] = [];
  for (let i = 0; i < len; i++) {
    words.push(WORDS[rand(0, WORDS.length - 1)]);
  }
  const sentence = words.join(" ");
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
}

function makeParagraph(): string {
  const count = rand(3, 6);
  return Array.from({ length: count }, makeSentence).join(" ");
}

export function generateLorem(
  count: number,
  unit: LoremUnit,
  startClassic: boolean,
): string {
  const n = Math.max(1, Math.min(count, 100));

  if (unit === "words") {
    const words: string[] = [];
    for (let i = 0; i < n; i++) words.push(WORDS[rand(0, WORDS.length - 1)]);
    let out = words.join(" ");
    if (startClassic) out = "Lorem ipsum " + out;
    return out.charAt(0).toUpperCase() + out.slice(1);
  }

  if (unit === "sentences") {
    const sentences = Array.from({ length: n }, makeSentence);
    if (startClassic) {
      sentences[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    }
    return sentences.join(" ");
  }

  // paragraphs
  const paras = Array.from({ length: n }, makeParagraph);
  if (startClassic) {
    paras[0] =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
      paras[0];
  }
  return paras.join("\n\n");
}
