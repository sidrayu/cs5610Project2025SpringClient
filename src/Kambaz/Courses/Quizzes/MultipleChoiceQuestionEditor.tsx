import { Modal, FormControl, Button, FormCheck,FormSelect,FormLabel } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa";
import { MdFormatColorText, MdFormatColorFill } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuSuperscript } from "react-icons/lu";
import AnswerReduxForm from "./AnswerRedux/AnswerReduxForm";
import AnswerReduxItem from "./AnswerRedux/AnswerReduxItem";
import { ListGroup } from "react-bootstrap";
import FillInAnswerForm from "./FillInAnswerRedux/FillInAnswerForm";
import FillInAnswerItem from "./FillInAnswerRedux/FillInAnswerItem";



import { useState } from "react";

export default function MultipleChoiceQuestionEditor({ show, handleClose,}: {
    show: boolean; handleClose: () => void;  
    } ) {
    // const [todos, setTodos] = useState<{ id: string; title: string }[]>([]);
    const [answers, setAnswers] = useState([
        { id: "1", title: "4"  },
        { id: "2", title: "5"  },
        { id: "3", title: "6"  },
        { id: "4", title: "7"  },
    ]);
      const [answer, setAnswer] = useState({ id: "-1", title: "" });
      const addAnswer = (answer: any) => {
        const newAnswers = [ ...answers, { ...answer,
          id: new Date().getTime().toString() }];
        setAnswers(newAnswers);
      };
      const deleteAnswer = (id: string) => {
        const newAnswers = answers.filter((answer) => answer.id !== id);
        setAnswers(newAnswers);
      };
      const updateAnswer = (answer: any) => {
        const newAnswers = answers.map((item) =>
          (item.id === answer.id ? answer : item));
        setAnswers(newAnswers);
      };
    
      const [fillinanswers, setFillInAnswers] = useState([
        { id: "5", title: "two"  },
        { id: "6", title: "2"  },
        { id: "7", title: "dos"  },
    ]);
      const [fillinanswer, setFillInAnswer] = useState({ id: "-1", title: "" });
      const addFillInAnswer = (fillinanswer: any) => {
        const newFillInAnswers = [ ...fillinanswers, { ...fillinanswer,
          id: new Date().getTime().toString() }];
          setFillInAnswers(newFillInAnswers);
      };
      const deleteFillInAnswer = (id: string) => {
        const newFillInAnswers = fillinanswers.filter((fillinanswer) => fillinanswer.id !== id);
        setFillInAnswers(newFillInAnswers);
      };
      const updateFillInAnswer = (fillinanswer: any) => {
        const newFillInAnswers = fillinanswers.map((item) =>
          (item.id === fillinanswer.id ? fillinanswer : item));
        setFillInAnswers(newFillInAnswers);
      };

    const [selectedOption, setSelectedOption] = useState("multipleChoice");
    // const [questions, setQuestions] = useState("How much is 2+2?");
    // const [points, setPoints] = useState(4);


    return (
        <Modal show={show} onHide={handleClose} size="lg" className="modal-dialog-scrollable"
        style={{ maxHeight: "90vh" }}>
            <div style={{ height: "90vh", overflowY: "auto" }}>
                <Modal.Header>
                    <Row className="align-items-center">
                        <Col md={4}>
                            <FormControl type="text" placeholder="Easy Question" />
                        </Col>
                        <Col md={5}>
                            <FormSelect 
                                className="w-100" 
                                value={selectedOption} 
                                onChange={(e) => {setSelectedOption(e.target.value); console.log(e.target.value);}}
                            >
                                <option value="multipleChoice">Multiple Choice</option>
                                <option value="trueFalse">True/False</option>
                                <option value="fillInTheBlank">Fill In the Blank</option>
                            </FormSelect>
                        </Col>
                        <Col md={3} className="text-end">
                            <div className="d-inline-flex align-items-center">
                            <FormLabel className="me-2 mb-0">pts:</FormLabel>
                            <FormControl
                                type="number"
                                placeholder="4"
                                style={{ width: "60px" }}
                            />
                            </div>
                        </Col>
                    </Row>
                </Modal.Header>
                <Modal.Body>
                    {selectedOption === "multipleChoice" && (
                        <>
                        {/* MultipleChoice */}
                        <FormLabel className="fs-6 fw-light text-muted">
                            Enter your question and multiple answers,
                            then select the one corrent answer.
                        </FormLabel>
                        <br />
                    </>)}

                    {selectedOption === "trueFalse" && (
                        <>
                        {/* True/False */}
                        <FormLabel className="fs-6 fw-light text-muted">
                            Enter your question text, 
                            then select if True or False is the correct answer.
                        </FormLabel>
                        <br />
                    </>)}
                    
                    {selectedOption === "fillInTheBlank" && (
                        <>
                        {/* Fill in the blank */}
                        <FormLabel className="fs-6 fw-light text-muted">
                            Enter your question text, 
                            then define all possible correct answers for the blank.
                            Students will see the question followed by a small text box to type their answer.
                        </FormLabel>
                        <br />
                    </>)}


                    <FormLabel className="me-2 mb-0 fw-bold fs-5">
                        Question:
                    </FormLabel>
                    <br />
                    <div className="d-flex gap-0 mb-0">
                        {["Edit", "View", "Insert", "Format", "Tools", "Table"].map((item, index) => (
                            <Button 
                            key={index}
                            variant="pills"
                            >
                                {item}
                            </Button>
                        ))}
                    </div>
                    <hr className="mt-1 mb-2" />
                    <div className="d-flex gap-2 align-items-center">
                        <FormSelect size="sm" className="w-auto" style={{ fontSize: "14px" }}>
                            <option>12pt</option>
                            <option>14pt</option>
                            <option>16pt</option>
                        </FormSelect>

                        <FormSelect size="sm" className="me-3 w-auto" style={{ fontSize: "14px" }}>
                            <option>Paragraph</option>
                            <option>Heading 1</option>
                            <option>Heading 2</option>
                        </FormSelect>
                        <FormLabel className="mb-0 me-3 text-secondary fs-6">
                            |
                        </FormLabel>
                        <FaBold className ="me-3" />
                        <FaItalic className ="me-3"  />
                        <FaUnderline className ="me-3"  />
                        <MdFormatColorText className ="me-3" />
                        <MdFormatColorFill className ="me-3" />
                        <LuSuperscript className ="me-3" />
                        <FormLabel className="mb-0  text-secondary fs-6">
                            |
                        </FormLabel>
                        <BsThreeDotsVertical className ="me-3" />
                        
                    </div>
                    <br/>
                    <FormControl as="textarea" defaultValue="How much is 2+2?" style={{height: "100px"}}/>


                    {selectedOption === "multipleChoice" && (
                        <>
                        {/* MultipleChoice */}
                        <div id="wd-css-responsive-forms-1">
                            <FormLabel className="me-2 mb-0 fw-bold fs-5">
                                Answers:
                            </FormLabel>
                            <ListGroup className="bg-light rounded p-3"
                                        >
                                {answers.map((answer) => (
                                    <AnswerReduxItem
                                        answer={answer}
                                        deleteAnswer={deleteAnswer}
                                        setAnswer={setAnswer} />
                                ))}
                            
                            </ListGroup>
                                <AnswerReduxForm
                                    answer={answer}
                                    setAnswer={setAnswer}
                                    addAnswer={addAnswer}
                                    updateAnswer={updateAnswer}/>
                        </div>
                    </>)}

                    {selectedOption === "trueFalse" && (
                        <>
                        {/* True/False */}  
                        <div id="wd-css-responsive-forms-1">
                            <FormLabel className="me-2 mb-0 fw-bold fs-5">
                                Answers:
                            </FormLabel>
                            <FormCheck className="align-items-center mb-3" type="radio" label="True" checked name="formHorizontalRadios"/>
                            <FormCheck className="align-items-center mb-3" type="radio" label="False" checked name="formHorizontalRadios"/>
                        </div>
                    </>)}

                    {selectedOption === "fillInTheBlank" && (
                        <>
                        {/* Fill in the blank */}  
                        <div id="wd-css-responsive-forms-1">
                            <FormLabel className="me-2 mb-0 fw-bold fs-5">
                                Answers:
                            </FormLabel>
                            <ListGroup className="bg-light rounded p-3"
                                        >
                                {fillinanswers.map((fillinanswer) => (
                                    <FillInAnswerItem
                                        fillinanswer={fillinanswer}
                                        deleteFillInAnswer={deleteFillInAnswer}
                                        setFillInAnswer={setFillInAnswer} />
                                ))}
                            
                            </ListGroup>
                                <FillInAnswerForm
                                    fillinanswer={fillinanswer}
                                    setFillInAnswer={setFillInAnswer}
                                    addFillInAnswer={addFillInAnswer}
                                    updateFillInAnswer={updateFillInAnswer}/>
                        </div>
                    </>)}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}> Cancel </Button>
                    <Button variant="danger"
                    onClick={() => {
                    
                    handleClose();
                    }} > Update Question </Button>
                </Modal.Footer>
            </div>
        </Modal>

    );}