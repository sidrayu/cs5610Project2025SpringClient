import { IoEllipsisVertical } from "react-icons/io5";
import { FaTrash, FaEdit } from "react-icons/fa";
import DeleteEditor from "./DeleteEditor";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { RiForbidLine } from "react-icons/ri";
import GreenCheckmark from "./GreenCheckmark";

export default function LessonControlButtons({ 
  quizId, 
  deleteQuiz,
  isPublished = false,
  onPublishToggle 
}: {
  quizId: string;
  deleteQuiz: (quizId: string) => void;
  isPublished?: boolean;
  onPublishToggle?: (quizId: string) => void;
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const { cid } = useParams();

  const handleEdit = () => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/Editor`);
  };

  const handlePublishToggle = () => {
    if (onPublishToggle) {
      onPublishToggle(quizId);
    }
  };

  return (
    <div className="float-end d-flex align-items-center">
      {!isPublished ? (
        <RiForbidLine 
          className="text-danger me-2"
        />
      ) : (
        <GreenCheckmark />
      )}
      
      <Dropdown>
        <Dropdown.Toggle variant="link" className="text-dark p-0">
          <IoEllipsisVertical className="fs-4" />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={handleEdit}>
            <FaEdit className="me-2" /> Edit
          </Dropdown.Item>
          <Dropdown.Item onClick={handlePublishToggle}>
            {isPublished ? (
              <>
                <RiForbidLine className="me-2" /> Unpublish
              </>
            ) : (
              <>
                <GreenCheckmark /> Publish
              </>
            )}
          </Dropdown.Item>
          <Dropdown.Item onClick={handleShow} className="text-danger">
            <FaTrash className="me-2" /> Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      
      <DeleteEditor
        show={show}
        handleClose={handleClose}
        dialogTitle="Delete Quiz"
        quizId={quizId}
        deleteQuiz={deleteQuiz}
      />
    </div>
  );
}

