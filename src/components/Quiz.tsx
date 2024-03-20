import React, { useState, useEffect } from 'react';
import './Quiz.css';
import QuizCore from '../core/QuizCore';

const Quiz: React.FC = () => {
  const [quizCore] = useState(new QuizCore());
  const [currentQuestion, setCurrentQuestion] = useState(quizCore.getCurrentQuestion());
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setCurrentQuestion(quizCore.getCurrentQuestion());
  }, [quizCore]);

  const handleOptionSelect = (option: string): void => {
    setSelectedAnswer(option);
  }

  const handleButtonClick = (): void => {
    if (selectedAnswer) {
      quizCore.answerQuestion(selectedAnswer);
      setScore(quizCore.getScore());
      // If not the nial question, go next
      quizCore.nextQuestion();
      setCurrentQuestion(quizCore.getCurrentQuestion());
      setSelectedAnswer(null);
    }
  };

  if (!currentQuestion) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {score} out of {quizCore.getTotalQuestions()}</p>
      </div>
    );
  }

  else if (quizCore.hasNextQuestion()){
    return (
      <div>
        <h2>Quiz Question:</h2>
        <p>{currentQuestion.question}</p>
  
        <h3>Answer Options:</h3>
        <ul>
          {currentQuestion.options.map((option) => (
            <li
              key={option}
              onClick={() => handleOptionSelect(option)}
              className={selectedAnswer === option ? 'selected' : ''}
            >
              {option}
            </li>
          ))}
        </ul>
  
        <h3>Selected Answer:</h3>
        <p>{selectedAnswer ?? 'No answer selected'}</p>
  
        <button onClick={handleButtonClick}>Next Question</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>

      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={handleButtonClick}>Submit</button>
    </div>
  );
};

export default Quiz;