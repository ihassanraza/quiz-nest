import { createContext, useState } from "react";

import quizData from '../data/quiz.json';

export const QuizContext = createContext();

export default function QuizContextProvider({ children }) {
    const [quiz, setQuiz] = useState(quizData);
    const [quizIndex, setQuizIndex] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);

    const handleSelectedOption = (option) => {
        let copyQuiz = [...quiz];
        copyQuiz[quizIndex].selected = option;
        setQuiz(copyQuiz);
    }

    const handleNextQuizItem = () => {
        setQuizIndex((prevVal) => prevVal + 1);
    }

    const handleQuizResult = () => {
        setIsCompleted(true);
    }

    const handleTryAgain = () => {
        quiz.map(question => question.selected = null);
        setIsCompleted(false);
        setQuizIndex(0);
    }

    return (
        <QuizContext.Provider value={{ quiz, quizIndex, isCompleted, handleSelectedOption, handleNextQuizItem, handleQuizResult, handleTryAgain }}>
            {children}
        </QuizContext.Provider>
    );
}