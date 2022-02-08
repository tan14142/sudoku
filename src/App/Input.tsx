import "./Input.css";
import { Button, Form, Modal } from "react-bootstrap";
import Numpad from "./Numpad";

interface InputProps {
  handleClickNumpad: (num: number) => void;
  pens: number[];
  selected: number;
  isCustom: boolean;
  isPen: boolean;
  setIsPen: (b: boolean) => void;
  handleClickClose: () => void;
  onHide: () => void;
  show: boolean;
}

export default function Input({
  handleClickNumpad,
  pens,
  selected,
  isCustom,
  isPen,
  setIsPen,
  handleClickClose,
  onHide,
  show,
}: InputProps) {
  return (
    <Modal animation={false} id="input" onHide={onHide} show={show} centered>
      <Modal.Body>
        <Numpad
          handleClickNumpad={handleClickNumpad}
          pens={pens}
          selected={selected}
          isCustom={isCustom}
          isPen={isPen}
        />
      </Modal.Body>
      <Modal.Footer>
        {isCustom ? (
          <Form id="inital-setup-form">
            <Form.Check
              checked
              disabled
              type="checkbox"
              label="initial setup"
              id="initial-setup-checkbox"
            />
          </Form>
        ) : (
          <Form id="pen-pencil-switch-form">
            <label className="pen" id="pen-label">
              Pen
            </label>
            <Form.Check
              onChange={(e) => setIsPen(e.target.checked)}
              defaultChecked={isPen}
              type="switch"
              id="pen-pencil-switch"
            />
            <label id="pencil-label">Pencil</label>
          </Form>
        )}
      </Modal.Footer>
      <Modal.Footer className="justify-content-between mx-1">
        <Button
          onClick={() => {
            handleClickNumpad(0);
          }}
          className="col"
          variant="warning"
        >
          Clear
        </Button>
        <Button onClick={handleClickClose} className="col" variant="secondary">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
