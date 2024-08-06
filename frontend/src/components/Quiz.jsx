import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Quiz.css';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isQuizCompleted, setIsQuizCompleted] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('https://react-quiz-app-d2w3.onrender.com/questions');
                setQuestions(response.data);
            } catch (error) {
                console.log("Error aa gya hai.");
            }
        };

        fetchQuestions();
    }, []);

    const handleOptionClick = (optionNumber) => {
        setSelectedAnswer(optionNumber);
    };

    const handleNextQuestion = () => {
        setSelectedAnswer(null);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setIsQuizCompleted(true);
        }
    };

    const shareOnWhatsApp = () => {
        const message = `I just updated my quiz answers!`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://api.whatsapp.com/send?text=${encodedMessage}`, '_blank');
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="quiz-update-card">
            <h1>Update Quiz Answers</h1>
            {isQuizCompleted ? (
                <div className="completion-message">
                    <p>Thank you!</p>
                    <button onClick={shareOnWhatsApp}>Share on WhatsApp</button>
                </div>
            ) : currentQuestion ? (
                <div>
                    <h2>{currentQuestion.question}</h2>
                    <div className="options">
                        <button onClick={() => handleOptionClick(1)}>
                            {currentQuestion.option1}
                        </button>
                        <button onClick={() => handleOptionClick(2)}>
                            {currentQuestion.option2}
                        </button>
                        <button onClick={() => handleOptionClick(3)}>
                            {currentQuestion.option3}
                        </button>
                        <button onClick={() => handleOptionClick(4)}>
                            {currentQuestion.option4}
                        </button>
                    </div>
                    <button onClick={handleNextQuestion} disabled={selectedAnswer === null}>
                        Next Question
                    </button>
                </div>
            ) : (
                <p>Loading questions...</p>
            )}
        </div>
    );
};

export default Quiz;
