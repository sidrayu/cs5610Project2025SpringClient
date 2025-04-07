import { ListGroup } from "react-bootstrap";
import { FormCheck } from "react-bootstrap";
export default function ShowQuestionsPage() {
    return (
        <div>
            <ListGroup className="rounded-0" id="wd-modules">
                <ListGroup.Item className="wd-quiz p-0 mb-0 fs-5 border-secondary">
                    <div className="wd-title d-flex align-items-center justify-content-between p-2 ps-3 bg-secondary text-dark">
                        <div className="d-flex align-items-center">
                            <span className="me-2 mb-0 fw-bold fs-5"> Question 1</span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <p className="me-2 mb-0 fw-bold fs-5">1 pts</p>
                        </div>
                    </div> 
                </ListGroup.Item>
                <ListGroup.Item className="wd-quiz ps-3 p-10 mb-0 fs-5 border-secondary">
                    <div className="d-flex align-items-center gap-2">
                        <p className="me-2 mb-0 fs-5">How much is 2+2?</p>
                    </div>
                    <hr />
                    <FormCheck className="align-items-center mb-3" type="radio" label="True" checked name="formHorizontalRadios"/>
                    <hr />
                    <FormCheck className="align-items-center mb-3" type="radio" label="False" checked name="formHorizontalRadios"/>
                </ListGroup.Item>
    
            </ListGroup>
            
        </div>    
    );
}