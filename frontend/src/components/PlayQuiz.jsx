import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlayQuiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [quizFinished, setQuizFinished] = useState(false);
    const [score, setScore] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('https://react-quiz-app-website.onrender.com/questions');
                setQuestions(response.data);
            } catch (error) {
                console.log("Error fetching questions:", error.message);
            }
        };

        fetchQuestions();
    }, []);

    const handleAnswerSelect = (optionNumber) => {
        setSelectedAnswer(optionNumber);
    };

    const handleNavigate = () => {
        navigate('/update-answer'); 
    };

    const handleSubmitAnswer = async () => {
        if (selectedAnswer === questions[currentQuestionIndex].ans) {
            setScore(score + 1);
        }
        setSelectedAnswer(null);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setQuizFinished(true);
        }
    };

    const currentQuestion = questions[currentQuestionIndex];

    const shareScoreOnWhatsApp = () => {
        const message = `I just completed a quiz and scored ${score} out of ${questions.length}!`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://api.whatsapp.com/send?text=${encodedMessage}`, '_blank');
    };

    return (
        <div>
            <h1>Play Quiz</h1>
            {quizFinished ? (
                <div>
                    <h2>Quiz Finished!</h2>
                    <h2>Your Score is: {score} / {questions.length}</h2>

                    <button onClick={handleNavigate}>
                        Update your own answer
                    </button>

                    <button onClick={shareScoreOnWhatsApp}>
                        Share Score on WhatsApp
                    </button>
                </div>
            ) : currentQuestion ? (
                <div>
                    <h2>{currentQuestion.question}</h2>
                    <div>
                        <button onClick={() => handleAnswerSelect(1)}>
                            {currentQuestion.option1}
                        </button>

                        <button onClick={() => handleAnswerSelect(2)}>
                            {currentQuestion.option2}
                        </button>

                        <button onClick={() => handleAnswerSelect(3)}>
                            {currentQuestion.option3}
                        </button>

                        <button onClick={() => handleAnswerSelect(4)}>
                            {currentQuestion.option4}
                        </button>
                    </div>

                    <button onClick={handleSubmitAnswer} disabled={selectedAnswer === null}>
                        Submit Answer
                    </button>
                </div>
            ) : (
                <p>Loading questions...</p>
            )}
        </div>
    );
};

export default PlayQuiz;
