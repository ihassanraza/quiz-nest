import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { handleDownloadCSV } from "../lib/helper-functions";

export default function QuizButton({ quiz, quizIndex, isCompleted, handleNextQuizItem, handleQuizResult, handleTryAgain }) {
    const selectedOption = quiz[quizIndex].selected;

    return (
        <Col lg="12">
            {
                quiz.length !== quizIndex + 1 ? 
                <Button onClick={handleNextQuizItem} className="btn btn-primary m-1" disabled={!selectedOption && 'disabled'}>Next Question</Button> : 
                !isCompleted ?
                <Button onClick={handleQuizResult} className="btn btn-primary m-1" disabled={!selectedOption && 'disabled'}>Result</Button> :
                <>
                    <Button onClick={handleTryAgain} className="btn btn-primary m-1">Try Again</Button>
                    <Button onClick={() => handleDownloadCSV(quiz)} className="btn btn-primary m-1">Download Csv</Button>
                </>
            }
        </Col>
    );
}