import { IoEllipsisVertical } from "react-icons/io5";
import { Button } from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';
export default function ModuleControlButtons() {
  return (
    <div className="float-end">
       <Button variant="outline-secondary" className="rounded-pill px-3 py-2 me-2 text-dark">
    40% of Total
  </Button>
      <BsPlus className="fs-2" />
      <IoEllipsisVertical className="fs-4" />
    </div> );}