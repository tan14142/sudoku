import "./App.css";
import { useEffect, useReducer, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Board from "./App/Board";
import Input from "./App/Input";
import Message from "./App/Message";
import Reseed from "./App/Reseed";
import { Button, Container, Row } from "react-bootstrap";
import { isValid } from "./App/isValid";
import generate from "./App/generate";
import resolve from "./App/resolve";

export default function App() {
  const [inits, setInits] = useState(example);
  let [pens, setPens] = useState(Array(81).fill(NaN));
  let [pencils, setPencils] = useState<number[][]>(
    Array(81)
      .fill([])
      .map(() => [])
  );
  let [valids, setValids] = useState(Array(81).fill(true));
  const [history, setHistory] = useState([collectHistory()]);
  const [selected, setSelected] = useState(NaN);
  const [isCustom, setIsCustom] = useState(false);
  const [isPen, setIsPen] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [showReseed, setShowReseed] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  /*eslint-disable*/
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const num = +e.code.slice(-1);

      if (e.code === "Backspace" || (e.code === "KeyZ" && e.ctrlKey)) {
        handleClickUndo();
      } else if (num > 0 && ["Digit", "Numpad"].includes(e.code.slice(0, -1))) {
        handleClickNumpad(num, !e.shiftKey);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selected]);

  function collectHistory() {
    return {
      pens: pens.slice(),
      pencils: pencils.map((cells) => cells.map((cell) => cell)),
      valids: valids.slice(),
    };
  }

  function pushHistory() {
    history.push(collectHistory());
    setHistory(history);
  }

  function handleClickCell(num: number) {
    setSelected(num);
    setShowInput(true);
  }

  function handleMouseOver(num: number) {
    setSelected(num);
  }

  function handleClickNumpad(num: number, penSelected = isPen) {
    if (num === 0) {
      pens[selected] = NaN;
      pencils[selected] = [];
      valids[selected] = true;
    } else if (isCustom || penSelected) {
      pens[selected] = pens[selected] == num ? NaN : num;
      pencils[selected] = [];

      const merged = Array(81)
        .fill(NaN)
        .map((_, i) => inits[i] || pens[i]);

      if (isValid(selected, merged)) {
        setShowInput(false);
        valids[selected] = true;

        for (let i = 0; i < 81; i++) {
          if (!valids[i] && isValid(i, merged)) {
            valids[i] = true;
          }
        }

        if (inits.every((init, key) => init || pens[key])) {
          setMessage("Loading victory message...");
          setTimeout(
            () => setMessage("＼(＾O＾)／＼(＾O＾)／＼(＾O＾)／"),
            4000
          );
          setShowMessage(true);
        }
      } else {
        valids[selected] = false;
      }
    } else if (pencils[selected].includes(num)) {
      pencils[selected].splice(pencils[selected].indexOf(num), 1);
    } else {
      pens[selected] = NaN;
      pencils[selected].push(num);
      valids[selected] = true;
    }

    setPens(pens);
    setPencils(pencils);
    setValids(valids);
    pushHistory();
    forceUpdate();
  }

  function handleClickUndo() {
    if (history.length > 1) {
      history.pop();
      setHistory(history);
    }

    setPens(history[history.length - 1].pens.slice());
    setPencils(
      history[history.length - 1].pencils.map((cells) => cells.slice())
    );
    setValids(history[history.length - 1].valids.slice());
  }

  function handleClickReseed(num: number) {
    if (num) {
      setInits(generate(num));
      setIsCustom(false);
    } else {
      setInits(Array(81).fill(NaN));
      setIsCustom(true);
    }

    handleClickReset();
    setShowReseed(false);
  }

  function handleClickReset() {
    pens = Array(81).fill(NaN);
    pencils = Array(81)
      .fill([])
      .map(() => []);
    valids = Array(81).fill(true);

    setPens(pens);
    setPencils(pencils);
    setValids(valids);
    setHistory([collectHistory()]);
  }

  function handleClickConfirm() {
    for (let i = 0; i < 81; i++) {
      if (!isValid(i, pens)) {
        setMessage("This custom setup is not available in your country.");
        setShowMessage(true);
        return;
      }
    }

    setInits(pens);
    handleClickReset();
    setIsCustom(false);
  }

  function handleClickResolve() {
    handleClickReset();
    setPens(resolve(inits));
    pushHistory();
  }

  return (
    <>
      <header>
        <h2>React-TypeScript-Bootstrap</h2>
        <h1>-Sudoku-</h1>
      </header>
      <Board
        handleClickCell={handleClickCell}
        handleMouseOver={handleMouseOver}
        inits={inits}
        pens={pens}
        pencils={pencils}
        valids={valids}
        isCustom={isCustom}
      />
      <Container id="controls">
        <Row className="justify-content-around">
          <Button
            onClick={handleClickUndo}
            className="col-2"
            variant="secondary"
          >
            Undo
          </Button>
          <Button onClick={handleClickReset} className="col-2" variant="danger">
            Reset
          </Button>
          <Button
            onClick={() => setShowReseed(true)}
            className="col-2"
            variant="warning"
          >
            Reseed
          </Button>
          {isCustom ? (
            <Button
              onClick={handleClickConfirm}
              className="col-2"
              variant="success"
            >
              Confirm
            </Button>
          ) : (
            <Button
              onClick={handleClickResolve}
              className="col-2"
              variant="success"
            >
              Resolve
            </Button>
          )}
          <Button
            onClick={() => {
              setMessage(intro);
              setShowMessage(true);
            }}
            className="col-2"
            variant="info"
          >
            Info
          </Button>
        </Row>
      </Container>
      <Input
        handleClickNumpad={handleClickNumpad}
        pens={pens}
        selected={selected}
        isCustom={isCustom}
        isPen={isPen}
        setIsPen={setIsPen}
        handleClickClose={() => setShowInput(false)}
        onHide={() => setShowInput(false)}
        show={showInput}
      />
      <Message
        body={message}
        handleClickClose={() => setShowMessage(false)}
        onHide={() => setShowMessage(false)}
        show={showMessage}
      />
      <Reseed
        handleClickReseed={handleClickReseed}
        handleClickClose={() => setShowReseed(false)}
        onHide={() => setShowReseed(false)}
        show={showReseed}
      />
    </>
  );
}

const example = [
  5,
  3,
  NaN,
  NaN,
  7,
  NaN,
  NaN,
  NaN,
  NaN,
  6,
  NaN,
  NaN,
  1,
  9,
  5,
  NaN,
  NaN,
  NaN,
  NaN,
  9,
  8,
  NaN,
  NaN,
  NaN,
  NaN,
  6,
  NaN,
  8,
  NaN,
  NaN,
  NaN,
  6,
  NaN,
  NaN,
  NaN,
  3,
  4,
  NaN,
  NaN,
  8,
  NaN,
  3,
  NaN,
  NaN,
  1,
  7,
  NaN,
  NaN,
  NaN,
  2,
  NaN,
  NaN,
  NaN,
  6,
  NaN,
  6,
  NaN,
  NaN,
  NaN,
  NaN,
  2,
  8,
  NaN,
  NaN,
  NaN,
  NaN,
  4,
  1,
  9,
  NaN,
  NaN,
  5,
  NaN,
  NaN,
  NaN,
  NaN,
  8,
  NaN,
  NaN,
  7,
  9,
];

const intro = `
Welcome to my Sudoku implementation!

Rules of the game:
-Google it!

Features:
-Mostly self explanatory
-Minimal support for mobile

Custom Game:
-Fill the board with clues
-Click Confirm
-Then click Resolve

Keyboard support:
-Hover your mouse for focus
-Digit and Numpad keys
-Hold Shift for pencil marks
-Backspace or CTRL+Z for undo
`