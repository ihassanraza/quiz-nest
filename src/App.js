import "./App.css";
import { useState } from "react";
import quizData from "./data/quiz.json";

function App() {
  const [questions, setQuestions] = useState(quizData);
  const [question, setQuestion] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const selectedOption = (questionIndex, option) => {
    let copyQuestions = [...questions];
    copyQuestions[questionIndex].selectedOption = option;
    setQuestions(copyQuestions);
  };

  const nextQuestion = () => {
    const nextQuestion = question + 1;
    if (nextQuestion < questions.length) {
      setQuestion(nextQuestion);
    }
  };

  const quizResult = () => {
    const nextQuestion = question + 1;
    if (nextQuestion === questions.length) {
      setQuizCompleted(true);
    }
  };

  const calculatePercentage = () => {
    const correctAnswers = questions.filter(
      (question) => question.answer === question.selectedOption
    ).length;
    const percentage = (correctAnswers / questions.length) * 100;
    return percentage.toFixed(2);
  };

  const quizRestart = () => {
    let initalQuizData = [...questions];
    let newQuizData = initalQuizData.map((question) => {
      if (question.selectedOption) {
        delete question.selectedOption;
      }
      return question;
    });
    setQuestions(newQuizData);
    setQuestion(0);
    setQuizCompleted(false);
  };

  const downloadQuizResults = () => {
    let csvRows = [];
    let header = Object.keys(questions[0]).join(',');
    csvRows.push(header);

    for( let i = 0; i < questions.length; i++ ) {
      let questionCopy = { ...questions[i] };
      questionCopy.options = questionCopy.options.join('|');
      let values = Object.values(questionCopy).join(',');
      csvRows.push(values);
    }

    const csvData = csvRows.join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
  
    a.setAttribute('href', url)
    a.setAttribute('download', 'quiz-nest.csv');
    a.click()
  };

  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center align-items-center vh-100">
        <div className="col-lg-6 col-md-12">
          <div className="card text-center shadow p-3 mb-5 bg-body-tertiary rounded">
            <div className="card-header bg-primary text-light">Quiz Nest</div>
            <div className="card-body mt-3">
              <div className="row">
                {!quizCompleted ? (
                  <>
                    <p>
                      Question {question + 1} out of {questions.length}
                    </p>
                    <h5 className="card-title mb-3">
                      {questions[question].question}
                    </h5>

                    {questions[question].options.map((option, optionIndex) => (
                      <>
                        <div className="col-6 mb-4">
                          <div className="list-group">
                            <button
                              onClick={() => selectedOption(question, option)}
                              className={
                                questions[question].selectedOption &&
                                questions[question].selectedOption === option
                                  ? "list-group-item list-group-item-action active"
                                  : "list-group-item list-group-item-action"
                              }
                            >
                              {option}
                            </button>
                          </div>
                        </div>
                      </>
                    ))}
                  </>
                ) : (
                  <>
                    <h3>Score</h3>
                    <div
                      className="progress p-0"
                      role="progressbar"
                      aria-label="Success striped example"
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <div
                        className="progress-bar progress-bar-striped bg-success"
                        style={{ width: calculatePercentage() + "%" }}
                      >
                        {calculatePercentage()}%
                      </div>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-striped table-hover mt-4">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Question</th>
                            <th>Correct Answer</th>
                            <th>Your Answer</th>
                          </tr>
                        </thead>
                        <tbody>
                          {questions.map((question) => (
                            <>
                              <tr>
                                <td>{question.id}</td>
                                <td>{question.question}</td>
                                <td>{question.answer}</td>
                                <td>{question.selectedOption}</td>
                              </tr>
                            </>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
                <>
                  <div className="col-12">
                    {question < questions.length - 1 ? (
                      <button
                        onClick={nextQuestion}
                        className={
                          questions[question].selectedOption
                            ? "btn btn-primary"
                            : "btn btn-primary disabled"
                        }
                      >
                        Next Question
                      </button>
                    ) : quizCompleted ? (
                      <>
                        <button
                          className="btn btn-primary m-1"
                          onClick={quizRestart}
                        >
                          Try Again
                        </button>
                        <button
                          className="btn btn-primary m-1"
                          onClick={downloadQuizResults}
                        >
                          Download Csv
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className={
                            questions[question].selectedOption
                              ? "btn btn-primary"
                              : "btn btn-primary disabled"
                          }
                          onClick={quizResult}
                        >
                          Result
                        </button>
                      </>
                    )}
                  </div>
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
