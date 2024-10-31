import { randomInt } from "crypto";

export function generateRandomIndexes(length: number, max?: number, excludeIndex?: number) {
  const randomIndexes: number[] = [];
  for (let i = 0; i < length; i++) {
    const randomIndex = randomInt(0, max ?? 60);
    if (randomIndexes.includes(randomIndex) || randomIndex === excludeIndex) {
      i--;
      continue;
    }
    randomIndexes.push(randomIndex);
  }
  return randomIndexes;
}
