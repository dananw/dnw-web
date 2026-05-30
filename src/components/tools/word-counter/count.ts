export interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingTime: string;
}

const WORDS_PER_MINUTE = 200;

export function analyze(text: string): TextStats {
  const characters = [...text].length;
  const charactersNoSpaces = [...text.replace(/\s/g, "")].length;

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  const sentences =
    (text.match(/[^.!?]+[.!?]+/g) || []).length || (text.trim() ? 1 : 0);

  const paragraphs = text.trim()
    ? text.split(/\n{2,}/).filter((p) => p.trim()).length
    : 0;

  const lines = text ? text.split("\n").length : 0;

  const minutes = words / WORDS_PER_MINUTE;
  const readingTime =
    words === 0
      ? "0 sec"
      : minutes < 1
        ? `${Math.max(1, Math.ceil(minutes * 60))} sec`
        : `${Math.ceil(minutes)} min`;

  return {
    characters,
    charactersNoSpaces,
    words,
    sentences,
    paragraphs,
    lines,
    readingTime,
  };
}
