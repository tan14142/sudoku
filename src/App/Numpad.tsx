interface NumpadProps {
  handleClickNumpad: (num: number) => void;
  pens: number[];
  selected: number;
  isCustom: boolean;
  isPen: boolean;
}

export default function Numpad({
  handleClickNumpad,
  pens,
  selected,
  isCustom,
  isPen,
}: NumpadProps) {
  function createClassName(num: number) {
    let className = "cell";

    if (!isCustom) {
      if (isPen) {
        className += " pen";

        if (pens[selected] === num) {
          className += " selected";
        }
      } else {
        className += " pencil";
      }
    }

    return className;
  }

  return (
    <div id="numpad">
      {Array(9)
        .fill(0)
        .map((_: any, key: number) => (
          <button
            className={createClassName(key + 1)}
            key={key}
            onClick={() => {
              handleClickNumpad(key + 1);
            }}
          >
            {key + 1}
          </button>
        ))}
    </div>
  );
}
