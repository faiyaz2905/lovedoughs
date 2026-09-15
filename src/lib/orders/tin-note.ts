export const TIN_NOTE_WORD_LIMIT = 15;

export function countWords(value: string) {
  const trimmedValue = value.trim();
  return trimmedValue ? trimmedValue.split(/\s+/).length : 0;
}

export function limitToWordCount(value: string, maximum = TIN_NOTE_WORD_LIMIT) {
  const words = value.match(/\S+/g) ?? [];
  return words.length > maximum ? words.slice(0, maximum).join(" ") : value;
}
