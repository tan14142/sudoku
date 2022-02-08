import { Button, Modal } from "react-bootstrap";

interface MessageProps {
  body: string;
  handleClickClose: () => void;
  onHide: () => void;
  show: boolean;
}

export default function Message({
  body,
  handleClickClose,
  onHide,
  show,
}: MessageProps) {
  return (
    <Modal animation={false} onHide={onHide} show={show} centered>
      <Modal.Body className="d-flex flex-column justify-content-between">
        {body.split("\n").map((line, k) => <p key={k}>{line}</p>)}
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button onClick={handleClickClose} variant="secondary">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
