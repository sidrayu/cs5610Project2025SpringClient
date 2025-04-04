import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import DeleteEditor from "./DeleteEditor";
import { useState } from "react";
export default function LessonControlButtons({ assignmentId, deleteAssignment}: 
  { assignmentId: string;
    deleteAssignment: (assignmentId: string) => void;}) {
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);  
  return (
    <div className="float-end">
      <FaTrash className="text-danger me-2 mb-1" onClick={handleShow}/>
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
      <DeleteEditor show={show} handleClose={handleClose} dialogTitle=" Delete Assignemnt"
            assignmentId={assignmentId}  deleteAssignment={deleteAssignment} />
    </div> );}