import { FaCircle } from "react-icons/fa";
import { BiBlock } from "react-icons/bi";
export default function GreyBlockmark() {
  return (
    <span className="me-1 position-relative">
      <BiBlock style={{ top: "2px" }} className="me-1 position-absolute fs-5"/>
      <FaCircle className="text-white me-1 fs-6" />
    </span>);}