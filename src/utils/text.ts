export interface TextPart {
  text: string;
  em: boolean;
}

/**
 * Splits "Hello *world*" into [{ text: 'Hello ', em: false }, { text: 'world', em: true }]
 * so headlines can show some words in tan italics.
 */
export function splitEmphasis(input: string): TextPart[] {
  return input
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part) =>
      part.length > 2 && part.startsWith('*') && part.endsWith('*')
        ? { text: part.slice(1, -1), em: true }
        : { text: part, em: false },
    );
}

/**
 * Splits a headline into words, for word-by-word animations. Each word is a
 * list of pieces that remember whether they were *emphasized*, so
 * "moments, *remembered beautifully*." ends with the word
 * [{ text: 'beautifully', em: true }, { text: '.', em: false }]: punctuation
 * stays attached to its word and never wraps onto a line of its own.
 */
export function splitWords(input: string): TextPart[][] {
  const words: TextPart[][] = [];
  let word: TextPart[] = [];
  for (const part of splitEmphasis(input)) {
    for (const token of part.text.split(/(\s+)/)) {
      if (!token) continue;
      if (/^\s+$/.test(token)) {
        if (word.length) words.push(word);
        word = [];
      } else {
        word.push({ text: token, em: part.em });
      }
    }
  }
  if (word.length) words.push(word);
  return words;
}

/** Removes the *asterisks* — for places that need plain text (alt text, meta tags). */
export function stripEmphasis(input: string): string {
  return input.replace(/\*([^*]+)\*/g, '$1');
}

/** True for values like "[Instagram link]" that haven't been filled in yet. */
export function isPlaceholder(value: string): boolean {
  return /^\[[^\]]*\]$/.test(value.trim());
}
