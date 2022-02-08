import "./Reseed.css";
import { Button, Modal } from "react-bootstrap";

interface ReseedProps {
  handleClickReseed: (num: number) => void;
  handleClickClose: () => void;
  onHide: () => void;
  show: boolean;
}

export default function Reseed({
  handleClickReseed,
  handleClickClose,
  onHide,
  show,
}: ReseedProps) {
  return (
    <Modal id="reseed" animation={false} onHide={onHide} show={show} centered>
      <Modal.Body className="d-flex flex-column justify-content-between">
        <Button onClick={() => handleClickReseed(45)} variant="success">
          Easy
        </Button>
        <Button onClick={() => handleClickReseed(40)} variant="warning">
          Medium
        </Button>
        <Button onClick={() => handleClickReseed(35)} variant="danger">
          Hard
        </Button>
        <Button onClick={() => handleClickReseed(0)} variant="primary">
          Custom
        </Button>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button onClick={handleClickClose} variant="secondary">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
