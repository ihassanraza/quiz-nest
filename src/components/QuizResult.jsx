import ProgressBar from 'react-bootstrap/ProgressBar';
import Table from 'react-bootstrap/Table';

import { calculatePercentage } from '../lib/helper-functions';

export default function QuizResult({ quiz }) {
    const percentage = calculatePercentage(quiz);

    return (
        <>
            <h3>Score</h3>
            <ProgressBar className="p-0" animated now={percentage} label={`${percentage}%`} />
            <Table responsive striped hover className="mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Question</th>
                        <th>Correct Answer</th>
                        <th>Your Answer</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        quiz.map((quizItem) => (
                            <tr key={quizItem.id}>
                                <td>{quizItem.id}</td>
                                <td>{quizItem.question}</td>
                                <td>{quizItem.answer}</td>
                                <td>{quizItem.selected}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </>
    );
}