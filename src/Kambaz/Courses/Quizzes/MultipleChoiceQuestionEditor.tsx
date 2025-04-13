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
import { useEffect } from "react";

export default function MultipleChoiceQuestionEditor({ show, handleClose, questions, setQuestions,
    curQuestionIndex
}: {
    show: boolean; handleClose: () => void; questions: any[];
    setQuestions: (questions: any[]) => void;
    curQuestionIndex: number;
    } ) {
    const [answers, setAnswers] = useState([
        { id: "1", title: "4"  },
        { id: "2", title: "5"  },
        { id: "3", title: "6"  },
        { id: "4", title: "7"  },
    ]);

    const [answerIndex, setAnswerIndex] = useState("-1");
    const [answer, setAnswer] = useState({ id: "-1", title: "" });

    // true/false
    const [selectedAnswer, setSelectedAnswer] = useState("");

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

    const [questionType, SetQuestionType] = useState("multipleChoice");
    const [question, setQuestion] = useState({
        _id: "",
        title: "",
        question: "",
        points: "",    
        type: "",
        choices: [{id: "", title: ""}],
        answer: "",
        answers: [{id: "", title: ""}],
    });
    const resetQuestion = {
        _id: "",
        title: "",
        question: "",
        points: "",    
        type: "",
        choices: [{id: "", title: ""}],
        answer: "",
        answers: [{id: "", title: ""}],
    };
    const [correctAnswer, setCorrectAnswer]  = useState("");
    const [correctAnswers, setCorrectAnswers] = useState([{id: "", title: ""}]); 


    // note to self: useEffect has to be used to avoid error: 
    //  Too many re-renders. React limits the number of renders to prevent an infinite loop.
    const loadCurrentQuestion = () => {
        if (curQuestionIndex > -1) {
            setQuestion({ ...questions[curQuestionIndex] });
            console.log("Current question: ", questions[curQuestionIndex]);
        } else {
            setQuestion(resetQuestion);
            console.log("reseted Current question: ", question);
        }
    };

    useEffect(() => {
        loadCurrentQuestion();
    }, [curQuestionIndex]);
    

    const handleUpdateQuestion = () => {
        let updatedQuestion = { ...question };
        console.log("Update question", updatedQuestion);
        console.log(question);
        console.log("Correct answer: ", correctAnswer);
        console.log("Correct answers: ", correctAnswers);

        if (questionType === "multipleChoice") {
            setCorrectAnswer(answer.id);
        } else if (questionType === "trueFalse") {
            setCorrectAnswer(answer.title);
        } else {
            setCorrectAnswers(fillinanswers)

        }

        console.log("Correct answer: ", correctAnswer);
        console.log("Correct answers: ", correctAnswers);
        console.log("Question type: ", questionType);
        if (questionType === "fillInTheBlank") {
            updatedQuestion = {
                ...updatedQuestion,
                type: questionType,
                answers: fillinanswers,
            };
        };
        if (questionType === "multipleChoice") {
            console.log("multiple answers: ", answers);
            updatedQuestion = {
                ...updatedQuestion,
                type: questionType,
                choices: answers,
                answer: answerIndex,
            };
        };
        if (questionType === "trueFalse") {
            console.log("Selected answer: ", selectedAnswer);
            updatedQuestion = {
                ...updatedQuestion,
                type: questionType,
                answer: selectedAnswer,
            };
        };
        
        console.log("Updated question: ", updatedQuestion);
        console.log("Current question index: ", curQuestionIndex);
        if (curQuestionIndex === -1) {
            questions.push(updatedQuestion);
        } else if (curQuestionIndex > -1) {
            questions[curQuestionIndex] = updatedQuestion;
        }
        setQuestions([...questions]);
        console.log(questions);
        setQuestion(resetQuestion);
        console.log("Question reset");
        console.log(question);
        SetQuestionType("multipleChoice");
    };
    return (
        <Modal show={show} onHide={handleClose} size="lg" className="modal-dialog-scrollable"
        style={{ maxHeight: "90vh" }}>
            <div style={{ height: "90vh", overflowY: "auto" }}>
                <Modal.Header>
                    <Row className="align-items-center">
                        <Col md={4}>
                            {/* questionName */}
                            <FormControl type="text" value= {question.title}
                            onChange={(e) => {setQuestion({ ...question, title: e.target.value }); console.log(question);}}
                            />
                        </Col>
                        <Col md={5}>
                            <FormSelect 
                                className="w-100" 
                                value={questionType} 
                                onChange={(e) => {SetQuestionType(e.target.value); setQuestion({ ...question, type: e.target.value }); console.log(question);}}
                            >
                                <option value="multipleChoice">Multiple Choice</option>
                                <option value="trueFalse">True/False</option>
                                <option value="fillInTheBlank">Fill In the Blank</option>
                            </FormSelect>
                        </Col>
                        <Col md={3} className="text-end">
                            <div className="d-inline-flex align-items-center">
                            {/* qustionPoints */}
                            <FormLabel className="me-2 mb-0">pts:</FormLabel>
                            <FormControl
                                type="number"
                                value={question.points}
                                style={{ width: "60px" }}
                                onChange={(e) => {setQuestion({ ...question, points: e.target.value }); console.log(question);}}
                            />
                            </div>
                        </Col>
                    </Row>
                </Modal.Header>
                <Modal.Body>
                    {questionType === "multipleChoice" && (
                        <>
                        {/* MultipleChoice */}
                        <FormLabel className="fs-6 fw-light text-muted">
                            Enter your question and multiple answers,
                            then select the one corrent answer.
                        </FormLabel>
                        <br />
                    </>)}

                    {questionType === "trueFalse" && (
                        <>
                        {/* True/False */}
                        <FormLabel className="fs-6 fw-light text-muted">
                            Enter your question text, 
                            then select if True or False is the correct answer.
                        </FormLabel>
                        <br />
                    </>)}
                    
                    {questionType === "fillInTheBlank" && (
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
                    {/* questionText */}
                    <FormControl as="textarea" value={question.question} style={{height: "100px"}}
                    onChange={(e) => {setQuestion({ ...question, question: e.target.value }); console.log(question);}}
                    />


                    {questionType === "multipleChoice" && (
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
                                        setIndex = {setAnswerIndex}
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

                    {questionType === "trueFalse" && (
                        <>
                        {/* True/False */}  
                        <div id="wd-css-responsive-forms-1">
                            <FormLabel className="me-2 mb-0 fw-bold fs-5">
                                Answers:
                            </FormLabel>
                            <FormCheck className="align-items-center mb-3" type="radio" value="true" label="True" name="formHorizontalRadios" checked={selectedAnswer === "true"}
                                onChange={(e) => setSelectedAnswer(e.target.value)}/>
                            <FormCheck className="align-items-center mb-3" type="radio" value="false" label="False" name="formHorizontalRadios" checked={selectedAnswer === "false"}
                                onChange={(e) => setSelectedAnswer(e.target.value)}/>
                        </div>
                    </>)}

                    {questionType === "fillInTheBlank" && (
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
                    handleUpdateQuestion();
                    handleClose();
                    }} > Update Question </Button>
                </Modal.Footer>
            </div>
        </Modal>

    );}