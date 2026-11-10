export interface TextPart {
  text: string;
  em: boolean;
}

/**
 * Splits "Hello *world*" into [{ text: 'Hello ', em: false }, { text: 'world', em: true }]
 * so headlines can show some words in gold italics.
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

/** Removes the *asterisks* — for places that need plain text (alt text, meta tags). */
export function stripEmphasis(input: string): string {
  return input.replace(/\*([^*]+)\*/g, '$1');
}

/** True for values like "[Instagram link]" that haven't been filled in yet. */
export function isPlaceholder(value: string): boolean {
  return /^\[[^\]]*\]$/.test(value.trim());
}
