import { ListGroup } from "react-bootstrap";
import { FormCheck } from "react-bootstrap";
import { GrEdit } from "react-icons/gr";


export default function ShowQuestionsPage({ questions, setShow, setCurQuestionIndex, curQuestionIndex}: 
    { questions: any[], 
        setShow: any, 
        setCurQuestionIndex: any,
        curQuestionIndex: number }) {
    // const defaultSetQuestions = useCallback(() => {}, []);
    console.log(questions);
    
    const handleShow = async (index: any) => {
        if (curQuestionIndex !== index) { 
            await new Promise((resolve) => {
                setCurQuestionIndex(index);
                resolve(null);
            });
        }
        await new Promise((resolve) => {
            setShow(true);
            resolve(null);
        });
        
    };
    
    return (
        <div>
            {questions.map((question: any) => (
                <ListGroup className="rounded-0" id="wd-modules">
                    {question.type === "multipleChoice" && (
                        <>
                        {/* multipleChoice */}
                        <ListGroup.Item className="wd-quiz p-0 mb-0 fs-5 border-secondary">
                            <div className="wd-title d-flex align-items-center justify-content-between p-2 ps-3 bg-secondary text-dark">
                                <div className="d-flex align-items-center">
                                    <span className="me-2 mb-0 fw-bold fs-5"> {question.title} </span>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <p className="me-2 mb-0 fw-bold fs-5">Pts: {question.points} </p>
                                    <button 
                                        className="btn btn-link p-0 text-danger fs-3" 
                                        id="wd-edit-question" 
                                        onClick={() => { console.log("question index", questions.indexOf(question)); handleShow(questions.indexOf(question));}}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <GrEdit />
                                    </button>
                                </div>
                            </div> 
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-quiz ps-3 p-10 mb-0 fs-5 border-secondary">
                            <div className="d-flex align-items-center gap-2">
                                <p className="me-2 mb-0 fs-5">{question.question} </p>
                                
                            </div>
                            <hr />
                            {question.choices.map((choice: any) => (
                                
                                <FormCheck className="align-items-center mb-3" type="radio" label={choice.title} name="formHorizontalRadios"/>
                                
                            ))}
                            
                        </ListGroup.Item>
                    </>)}

                    {question.type === "trueFalse" && (
                        <>
                    {/* trueFalse */}
                    <ListGroup.Item className="wd-quiz p-0 mb-0 fs-5 border-secondary">
                    <div className="wd-title d-flex align-items-center justify-content-between p-2 ps-3 bg-secondary text-dark">
                        <div className="d-flex align-items-center">
                            <span className="me-2 mb-0 fw-bold fs-5"> {question.title}</span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <p className="me-2 mb-0 fw-bold fs-5">Pts: {question.points}</p>
                            <button 
                                        className="btn btn-link p-0 text-danger fs-3" 
                                        id="wd-edit-question" 
                                        onClick={() => { console.log("question index", questions.indexOf(question)); handleShow(questions.indexOf(question));}}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <GrEdit />
                            </button>
                        </div>
                    </div> 
                    </ListGroup.Item>
                    <ListGroup.Item className="wd-quiz ps-3 p-10 mb-0 fs-5 border-secondary">
                        <div className="d-flex align-items-center gap-2">
                            <p className="me-2 mb-0 fs-5">{question.question}</p>
                        </div>
                        <hr />
                        <FormCheck className="align-items-center mb-3" type="radio" label="True" name="formHorizontalRadios"/>
                        <hr />
                        <FormCheck className="align-items-center mb-3" type="radio" label="False" name="formHorizontalRadios"/>
                    </ListGroup.Item>
                    </>)}

                    {question.type === "fillInTheBlank" && (
                        <>
                    {/* fillInTheBlank */}
                    <ListGroup.Item className="wd-quiz p-0 mb-0 fs-5 border-secondary">
                        <div className="wd-title d-flex align-items-center justify-content-between p-2 ps-3 bg-secondary text-dark">
                            <div className="d-flex align-items-center">
                                <span className="me-2 mb-0 fw-bold fs-5"> {question.title}</span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <p className="me-2 mb-0 fw-bold fs-5">Pts: {question.points}</p>
                                <button 
                                        className="btn btn-link p-0 text-danger fs-3" 
                                        id="wd-edit-question" 
                                        onClick={() => { console.log("question index", questions.indexOf(question)); handleShow(questions.indexOf(question));}}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <GrEdit />
                                </button>
                            </div>
                        </div> 
                    </ListGroup.Item>
                    <ListGroup.Item className="wd-quiz ps-3 p-10 mb-0 fs-5 border-secondary">
                        <div className="d-flex align-items-center gap-2">
                            <p className="me-2 mb-0 fs-5">{question.question}</p>
                        </div>
                    </ListGroup.Item>
                    </>)}

                    <br /><br />
                </ListGroup>
            
                
                ))}

        </div>    
    );
}