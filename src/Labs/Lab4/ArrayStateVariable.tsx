import { useState } from "react";
export default function ArrayStateVariable() {
 const [array, setArray] = useState([1, 2, 3, 4, 5]);
 const addElement = () => {
   setArray([...array, Math.floor(Math.random() * 100)]);
 };
 const deleteElement = (index: number) => {
   setArray(array.filter((_item, i) => i !== index));
 };
 return (
  <div id="wd-array-state-variables">
   <h2>Array State Variable</h2>
   <button className="btn btn-success" onClick={addElement}>Add Element</button>
   <hr/>
   <ul>
    {array.map((item, index) => (
     <li key={index}> {item}
     &nbsp; &nbsp;
      <button className="btn btn-danger" onClick={() => deleteElement(index)}>
       Delete</button>
       <hr/>
     </li>))}
   </ul><hr/></div>);}