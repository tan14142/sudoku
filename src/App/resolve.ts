import { isValid } from "./isValid";

export default function resolve(inits: number[]) {
  const grid = inits.slice();

  let direction = 1;
  let index = 0;

  while (index < 81) {

    if (isNaN(inits[index])) {
      if (isNaN(grid[index])) {
        grid[index] = 1;
      }
      else if (grid[index] === 9) {
        direction = -1;
        grid[index] = NaN;
        index -= 1;
        continue;
      }
      else {
        grid[index] += 1;
      }
      if (isValid(index, grid)) {
        direction = 1;
        index += 1
      }
    }
    else {
      index += direction;
    }
  }

  return grid;
}