import "./Board.css";
import Pencil from "./Pencil";

interface BoardProps {
  handleClickCell: (num: number) => void;
  handleMouseOver: (num: number) => void;
  inits: number[];
  pens: number[];
  pencils: number[][];
  valids: boolean[];
  isCustom: boolean;
}

export default function Board({
  handleClickCell,
  handleMouseOver,
  inits,
  pens,
  pencils,
  valids,
  isCustom,
}: BoardProps) {
  function createClassName(init: number, pen: number, valid: boolean) {
    let className = "cell";

    if (!isCustom && !init) {
      className += pen ? " pen" : " pencil";
    }
    if (!valid) {
      className += " invalid";
    }

    return className;
  }

  return (
    <div id="board">
      {inits.map((init, k) => (
        <button
          onClick={() => handleClickCell(k)}
          onMouseOver={() => handleMouseOver(k)}
          className={createClassName(init, pens[k], valids[k])}
          disabled={!!init}
          key={k}
        >
          {init || pens[k] || <Pencil nums={pencils[k]} />}
        </button>
      ))}
    </div>
  );
}
