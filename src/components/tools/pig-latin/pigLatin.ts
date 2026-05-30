function convertWord(word: string): string {
  const wasCapitalized = /^[A-Z]/.test(word);
  const lower = word.toLowerCase();

  let result: string;
  if (/^[aeiou]/.test(lower)) {
    result = `${lower}way`;
  } else {
    const cluster = lower.match(/^[^aeiou]+/)?.[0] ?? "";
    result = `${lower.slice(cluster.length)}${cluster}ay`;
  }

  return wasCapitalized ? result.charAt(0).toUpperCase() + result.slice(1) : result;
}

/** Translate English text into Pig Latin, leaving non-letters untouched. */
export function toPigLatin(text: string): string {
  return text.replace(/[A-Za-z]+/g, (word) => convertWord(word));
}
