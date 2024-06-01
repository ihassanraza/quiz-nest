import { useContext } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import { QuizContext } from "./context/QuizContext";
import QuizOptions from "./components/QuizOptions";
import QuizButton from "./components/QuizButton";
import QuizResult from "./components/QuizResult";

function App() {
  const { quiz, quizIndex, isCompleted, handleSelectedOption } = useContext(QuizContext);
  const quizOptions = quiz[quizIndex].options;
  const selectedOption = quiz[quizIndex].selected;

  return (
    <Container fluid>
      <Row className="d-flex justify-content-center align-items-center vh-100">
        <Col lg="6" md="12">
          <Card className="text-center shadow p-3 mb-5 bg-body-tertiary rounded">
            <Card.Header className="bg-primary text-light">Quiz Nest</Card.Header>
            <Card.Body className="mt-3">
              <Row>
                {
                  isCompleted ?
                  <QuizResult quiz={quiz} /> :
                  <>
                    <p>Question {quizIndex + 1} out of {quiz.length}</p>
                    <Card.Title className="mb-3">{quiz[quizIndex].question}</Card.Title>
                    <QuizOptions options={quizOptions} selectedOption={selectedOption} handleSelectedOption={handleSelectedOption} />
                  </>
                }
                <QuizButton {...useContext(QuizContext)} />
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
