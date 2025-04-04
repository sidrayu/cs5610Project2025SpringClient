import { Form, Row, Col, Button, Card } from 'react-bootstrap'; 
import { Link } from "react-router-dom";
import { useParams , useLocation } from "react-router";
import { addAssignment, updateAssignment } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";
export default function EditAssignment() {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const pathSegments = pathname.split("/");
  const assignmentId = pathSegments[pathSegments.length - 1];
  const { assignments } = useSelector((state: any) => state.assignmentReducer);
  const assignment = assignments.find((a: any) => a._id === assignmentId);
  const dispatch = useDispatch();


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState("");
  const [startdate, setStartdate] = useState("");
  const [duedate, setDuedate] = useState("");
  const [untildate, setUntildate] = useState("");

  useEffect(() => {
    if (assignment) {
      setTitle(assignment.title || "");
      setDescription(assignment.description || "");
      setPoints(assignment.points || "100 pts");
      setStartdate(assignment.startdate || "");
      setDuedate(assignment.duedate || "");
      setUntildate(assignment.untildate || "");
    } else {
      setTitle("New Assignment");
      setDescription("New Assignment Description");
      setPoints("100 pts");
    }
  }, [assignment]);

  function convertToDatetimeLocal(dateString: string): string {
    if (!dateString.includes(" ")) {
      return dateString;
    }
    const [monthStr, day, , timeStr] = dateString.split(" "); 
    const months: { [key: string]: string } = {
      "January": "01", "February": "02", "March": "03", "April": "04",
      "May": "05", "June": "06", "July": "07", "August": "08",
      "September": "09", "October": "10", "November": "11", "December": "12"
    };
    const month = months[monthStr as keyof typeof months] || "01";
    let [hour, minute] = timeStr.match(/\d+/g) ?? ["00", "00"]; 
    const isPM = timeStr.includes("pm");
    if (isPM && hour !== "12") hour = String(Number(hour) + 12); 
    if (!isPM && hour === "12") hour = "00"; 
    let year = new Date().getFullYear(); 
    return `${year}-${month}-${day.padStart(2, "0")}T${hour.padStart(2, "0")}:${minute}`;
    // return dateString;
  }

  function ConvertToCustomTime(dateString: string): string {
    const date = new Date(dateString);
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[date.getMonth()];  
    const day = date.getDate();                 
    let hour = date.getHours();                  
    const minute = date.getMinutes();      
    let ampm = "am";
    if (hour === 0) {
      hour = 12;     
    } else if (hour === 12) {
      ampm = "pm";   
    } else if (hour > 12) {
      hour = hour - 12; 
      ampm = "pm";
    }
    const minuteStr = minute.toString().padStart(2, "0");
  
    return `${month} ${day} at ${hour}:${minuteStr}${ampm}`;
  }

  const handleSave = () => {
    if (!assignments.some((a: any) => a._id === assignmentId)) {
      console.log("test");
      createAssignmentForCourse();
    } else {
      console.log(assignment);
        saveAssignment(assignment);
    }
  };

   const createAssignmentForCourse = async () => {
        console.log("cid:", cid, " assignmentId:", assignmentId);
        if (!cid) return;
        const newAssignment = { title: title, course: cid, description: description, points: points, startdate: startdate, duedate: duedate, untildate: untildate };
        const assignment = await coursesClient.createAssignmentForCourse(cid, newAssignment);
        console.log(assignment);
        dispatch(addAssignment({
          _id: assignmentId,
          course: cid,
          title,
          description,
          points,
          startdate,
          duedate,
          untildate,
          modules: assignment?.modules || "",
        }));
      };

      const saveAssignment = async (assignment: any) => {
        console.log(assignment);
        const upassignment= await assignmentsClient.updateAssignment({
          _id: assignmentId,
          course: cid,
          title,
          description,
          points,
          startdate,
          duedate,
          untildate,
          modules: assignment?.modules || "",
        });
        console.log(assignment);
        console.log(upassignment);
        dispatch(updateAssignment({
          _id: assignmentId,
          course: cid,
          title,
          description,
          points,
          startdate,
          duedate,
          untildate,
          modules: assignment?.modules || "",
        }));
      };
    
    


  return (
    <div className="p-4">
      
      {/* Assignment Form */}
      <Form>
        {/* Assignment Name */}
        <Form.Group controlId="assignmentName" className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <br></br>
          <Form.Control type="text" defaultValue={assignment ? assignment.title : "New Assignment"} 
          onChange={(e) => setTitle(e.target.value)}/>
        </Form.Group>

        {/* Description */}
        <Form.Group controlId="assignmentDescription" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={4} 
            defaultValue={assignment ? assignment.description : "New Assignment Description"}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="points" className="mb-3">
        <Row>
          <Col sm={3}>
          <Form.Label className="d-flex justify-content-end">Points</Form.Label>

          </Col>
          <Col sm={9}>
            <Form.Control type="number" defaultValue={assignment ? parseInt(assignment.points) || 100 : 100} 
            onChange={(e) => setPoints(e.target.value + " pts")}/>
          </Col>
        </Row>
      </Form.Group>

        {/* Assignment Group */}
      <Form.Group controlId="assignmentGroup" className="mb-3">
        <Row>
          <Col sm={3}>
            <Form.Label className="d-flex justify-content-end">Assignment Group</Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control as="select" defaultValue="ASSIGNMENTS">
              <option>QUIZZES</option>
              <option>ASSIGNMENTS</option>
              <option>EXAMS</option>
              <option>PROJECTS</option>
            </Form.Control>
          </Col>
        </Row>
      </Form.Group>

        <Form.Group controlId="displayGrade" className="mb-3">
        <Row>
          <Col sm={3}>
            <Form.Label className="d-flex justify-content-end">Display Grade as</Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control as="select" defaultValue="Percentage">
              <option>Percentage</option>
              <option>Points</option>
            </Form.Control>
          </Col>
        </Row>
      </Form.Group>


        <Row>
          <Col sm={3}>
            <Form.Label className="d-flex justify-content-end">Submission Type</Form.Label>
          </Col>
          <Col sm={9}>
        <Card className="mb-3">
      <Card.Body>
        <Form.Group controlId="submissionType" className="mb-3">
          <Form.Label >Submission Type</Form.Label>
          <Form.Control as="select">
            <option>Online</option>
            <option>In Person</option>
          </Form.Control>
        </Form.Group>

  
        <Form.Group controlId="onlineEntryOptions" className="mb-3">
          <Form.Label>Online Entry Options</Form.Label>
          <div>
            <Form.Check label="Text Entry" />
            <Form.Check label="Website URL" defaultChecked />
            <Form.Check label="Media Recordings" />
            <Form.Check label="Student Annotation" />
            <Form.Check label="File Uploads" />
          </div>
        </Form.Group>
      </Card.Body>
    </Card>
    </Col>
    </Row>


    <Row>
          <Col sm={3}>
            <Form.Label className="d-flex justify-content-end">Assign</Form.Label>
          </Col>
          <Col sm={9}>
          <Card className="mb-3">
          <Card.Body>
      <Form.Group controlId="assignTo" className="mb-3">
        <Form.Label>Assign to</Form.Label>
        <Form.Control as="select" defaultValue="Everyone">
              <option>Everyone</option>
              <option>Section 101</option>
              <option>Section 102</option>
              <option>Section 103</option>
            </Form.Control>
      </Form.Group>

      {/* Due, Available from, Until Section */}
      <Row className="mb-3">
          {/* Due Date */}
          <Col>
            <Form.Group controlId="dueDate">
              <Form.Label>Due</Form.Label>
              <Form.Control type="datetime-local" defaultValue={assignment ? convertToDatetimeLocal(assignment.duedate) : ""}
              onChange={(e) => setDuedate(ConvertToCustomTime(e.target.value))}/>
            </Form.Group>
          </Col>
          </Row>
          <Row className="mb-3">

          {/* Available from Date */}
          <Col sm={6}>
            <Form.Group controlId="availableFrom">
              <Form.Label>Available from</Form.Label>
              <Form.Control type="datetime-local" defaultValue={assignment ? convertToDatetimeLocal(assignment.startdate) : ""}
              onChange={(e) => setStartdate(ConvertToCustomTime(e.target.value))}
              />
            </Form.Group>
          </Col>

          {/* Until Date */}
          <Col sm={6}>
            <Form.Group controlId="untilDate">
              <Form.Label>Until</Form.Label>
              <Form.Control type="datetime-local" defaultValue={assignment ? convertToDatetimeLocal(assignment.untildate) : ""}
              onChange={(e) => setUntildate(ConvertToCustomTime(e.target.value))}
              />
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
      </Card>
    </Col>
    </Row>

        <hr />
        <div style={{ textAlign: 'right' }} className="justify-content-between">
        <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
        <Button variant="secondary" className="me-2">Cancel</Button>
          </Link>
          <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
          <Button variant="danger" onClick={handleSave}>Save</Button>
          </Link>
          
        </div>
      </Form>
    </div>
  );
}