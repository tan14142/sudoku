import { getRow, getCol, getSquare } from "./Checks";

export default function generate(clues: number) {
  function pickRandom() {
    function filter(sieve: number[]) {
      return picks.filter(num => {
        return !sieve.includes(num);
      });
    }

    let picks = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    picks = filter(closed[closed.length - 1]);
    picks = filter(getRow(stack.length, stack));
    picks = filter(getCol(stack.length, stack));
    picks = filter(getSquare(stack.length, stack));

    if (picks.length) {
      return picks[Math.floor(Math.random() * (picks.length - 1))];
    }
    return 0;
  }

  const stack: number[] = [];
  const closed: number[][] = [[]];

  while(stack.length !== 81) {
    let pick = pickRandom();

    if (pick === 0) {
      stack.pop();
      closed.pop();
      continue;
    }

    stack.push(pick);
    closed[closed.length - 1].push(pick);
    closed.push([]);
  }

  let NaNs = 81 - clues;

  while (NaNs) {
    const randomPick = Math.floor(Math.random() * 80);

    if (isNaN(stack[randomPick])) {
      continue;
    }
    NaNs -= 1;
    stack[randomPick] = NaN;
  }

  return stack;
}
