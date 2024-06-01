import Col from "react-bootstrap/Col"
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/ListGroup";

export default function QuizOptions({ options, selectedOption, handleSelectedOption }) {
    return (
        options.map((option, optionIndex) => (
            <Col lg="6" className="mb-4" key={optionIndex}>
                <ListGroup>
                    <Button onClick={() => handleSelectedOption(option)} className={selectedOption && selectedOption === option ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'}>{option}</Button>
                </ListGroup>
            </Col>
        ))
    );
}