function getRow(index: number, stack: number[]) {
  const row = [];

  for (let i = index - (index % 9); i < index; i++) {
    row.push(stack[i]);
  }

  return row;
}

function getCol(index: number, stack: number[]) {
  const col = [];

  for (let i = (index % 9) - 9; i < index; i += 9) {
    col.push(stack[i]);
  }

  return col;
}

function getSquare(index: number, stack: number[]) {
  const square = [];

  for (let i of squareToCells[cellToSquare[index]]) {
    if (!(i in stack)) {
      break;
    }
    square.push(stack[i]);
  }
  return square;
}

function calcSquare(num: number) {
  return num + 6 * Math.floor(num / 3);
}

const range9 = Array.from(Array(9).keys());
const cellToSquare: number[] = Array(81);
const squareToCells: number[][] = Array(9);

let x = -9;
let y = 0;

for (let i = 0; i < 9; i++) {
  if (i % 3 === 0) {
    x += 9;
    y = -3;
  }
  y += 3;

  /*eslint-disable*/
  squareToCells[i] = range9.map((n: number) => {
    const index = calcSquare(n + x) + y;
    cellToSquare[index] = i;
    return index;
  });
}

export {getRow, getCol, getSquare, cellToSquare, squareToCells};