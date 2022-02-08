import { cellToSquare, squareToCells } from "./Checks";

function getRow(index: number, grid: number[]) {
  const row = [];
  const start = index - (index % 9);

  for (let i = start; i < start + 9; i++) {
    if (!isNaN(grid[i]) && i !== index) {
      row.push(grid[i]);
    }
  }

  return row;
}

function getCol(index: number, grid: number[]) {
  const col = [];

  for (let i = (index % 9) - 9; i < 81; i += 9) {
    if (!isNaN(grid[i]) && i !== index) {
      col.push(grid[i]);
    }
  }

  return col;
}

function getSquare(index: number, grid: number[]) {
  const square: number[] = [];

  for (let i = 0; i < 9; i++) {
    if (
      !isNaN(grid[squareToCells[cellToSquare[index]][i]]) &&
      squareToCells[cellToSquare[index]][i] !== index
    ) {
      square.push(grid[squareToCells[cellToSquare[index]][i]]);
    }
  }

  return square;
}

function isValid(index: number, grid: number[]) {
  return !getRow(index, grid).includes(grid[index]) && !getCol(index, grid).includes(grid[index]) && !getSquare(index, grid).includes(grid[index]);
}

export { isValid };
