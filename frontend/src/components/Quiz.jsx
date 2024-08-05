import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isQuizCompleted, setIsQuizCompleted] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('https://react-quiz-app-d2w3.onrender.com/questions');
                setQuestions(response.data);
            } catch (error) {
                console.log("Error aa gya hai...");
            }
        };

        fetchQuestions();
    }, []);

    const handleOptionClick = async (optionNumber) => {
        if (questions.length === 0 || isQuizCompleted) return; 

        try {
            const response = await axios.post('https://react-quiz-app-d2w3.onrender.com/update-answer', {
                newAnswer: optionNumber,
                questionId: questions[currentQuestionIndex]._id
            });

            // Move to the next question
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                setIsQuizCompleted(true); 
            }
        } catch (error) {
            console.log("Error occurred:", error.message);
        }
    };

    const currentQuestion = questions[currentQuestionIndex];

    const shareOnWhatsApp = () => {
        const url = 'https://react-quiz-app-website.onrender.com/';
        
        const text = encodeURIComponent(`Check out this quiz! ${url}`);
        window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    };

    return (
        <div>
            <h1>Update Quiz Answers</h1>
            {isQuizCompleted ? (
                <div>
                    <p>Thank you!</p>
                    <button onClick={shareOnWhatsApp}>Share on WhatsApp</button>
                </div>
            ) : currentQuestion ? (
                <div>
                    <h2>{currentQuestion.question}</h2>
                    <div>
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
                </div>
            ) : (
                <p>Loading questions...</p>
            )}
        </div>
    );
};

export default Quiz;
