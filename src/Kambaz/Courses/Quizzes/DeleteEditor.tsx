import { Button, Modal } from "react-bootstrap";

export default function DeleteEditor({
  show,
  handleClose,
  dialogTitle,
  quizId,
  deleteQuiz,
}: {
  show: boolean;
  handleClose: () => void;
  dialogTitle: string;
  quizId: string;
  deleteQuiz: (quizId: string) => void;
}) {
  return (
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>{dialogTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                  Cancel
              </Button>
              <Button
                  variant="primary"
                  onClick={() => {
                      deleteQuiz(quizId);
                      handleClose();
                  }}
              >
                  OK
              </Button>
          </Modal.Footer>
      </Modal>
  );
}