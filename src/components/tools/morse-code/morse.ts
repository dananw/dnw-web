const TEXT_TO_MORSE: Record<string, string> = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.",
  H: "....", I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.",
  O: "---", P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-", U: "..-",
  V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..",
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
  "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
  ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.", "!": "-.-.--",
  "/": "-..-.", "(": "-.--.", ")": "-.--.-", "&": ".-...", ":": "---...",
  ";": "-.-.-.", "=": "-...-", "+": ".-.-.", "-": "-....-", "_": "..--.-",
  '"': ".-..-.", $: "...-..-", "@": ".--.-.",
};

const MORSE_TO_TEXT: Record<string, string> = Object.fromEntries(
  Object.entries(TEXT_TO_MORSE).map(([k, v]) => [v, k])
);

/** Encode text to Morse: letters separated by spaces, words by " / ". */
export function textToMorse(text: string): string {
  return text
    .trim()
    .toUpperCase()
    .split(/\s+/)
    .map((word) =>
      Array.from(word)
        .map((ch) => TEXT_TO_MORSE[ch] ?? "")
        .filter(Boolean)
        .join(" ")
    )
    .filter(Boolean)
    .join(" / ");
}

/** Decode Morse back to text. Accepts "/" or multiple spaces as word breaks. */
export function morseToText(morse: string): string {
  return morse
    .trim()
    .split(/\s*\/\s*|\s{2,}/)
    .map((word) =>
      word
        .trim()
        .split(/\s+/)
        .map((code) => MORSE_TO_TEXT[code] ?? (code ? "?" : ""))
        .join("")
    )
    .filter(Boolean)
    .join(" ");
}
